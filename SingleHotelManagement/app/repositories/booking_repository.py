from sqlalchemy import cast, DECIMAL, and_, case, literal
from sqlalchemy.sql.functions import concat, func, coalesce

from app import db
from app.models.booking import Booking, BookingStatus
from app.models.booking_detail import BookingDetail
from app.models.room import Room, RoomStatus
from distutils.util import strtobool

from app.models.tier import Tier
from app.models.user import User


def create_booking(data):
    booking = Booking(
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        status=BookingStatus.CONFIRMED,
        receptionist_id=data.get('receptionist_id'),
        booker_id=data.get('booker_id')
    )
    db.session.add(booking)

    # Get available room
    rooms = db.session.query(Room).filter(Room.tier_id.__eq__(data.get('tier_id'))).filter(
        Room.status.__eq__(RoomStatus.AVAILABLE)).all()
    if len(rooms) == 0:
        db.rollback()
        return None
    room = rooms[0]

    # Create booking detail
    booking_detail = BookingDetail(
        booking_id=booking.id,
        room_id=room.id,
    )
    db.session.add(booking_detail)
    # Change status room
    room.status = RoomStatus.RESERVED
    if strtobool(data.get('foreigner').lower()):
        booking_detail.num_foreigner_guest = 1
    else:
        booking_detail.num_normal_guest = 1

    db.session.commit()
    return {
        'booking': booking.to_dict(),
        'room': room.to_dict()
    }


def get_booking_by_id(booking_id):
    return db.session.query(Booking).filter(Booking.id == booking_id).first()


def cancel_booking(booking_id):
    booking = get_booking_by_id(booking_id)
    booking.status = BookingStatus.CANCELED
    db.session.commit()
    set_status_room_by_booking_id(booking_id, RoomStatus.AVAILABLE)


def check_out(booking_id):
    booking = get_booking_by_id(booking_id)
    booking.status = BookingStatus.CHECKED_OUT
    db.session.commit()
    set_status_room_by_booking_id(booking_id, RoomStatus.AVAILABLE)


def check_in(booking_id):
    booking = get_booking_by_id(booking_id)
    booking.status = BookingStatus.CHECKED_IN
    db.session.commit()
    set_status_room_by_booking_id(booking_id, RoomStatus.OCCUPIED)


def reserve(booking_id):
    booking = get_booking_by_id(booking_id)
    booking.status = BookingStatus.CONFIRMED
    db.session.commit()
    set_status_room_by_booking_id(booking_id, RoomStatus.RESERVED)


def set_status_room_by_booking_id(booking_id, status_room):
    booking_details = db.session.query(Room).join(BookingDetail, Room.id == BookingDetail.room_id).filter(
        BookingDetail.booking_id == booking_id).all()

    # Cập nhật trạng thái của các phòng
    for room in booking_details:
        room.status = status_room

    db.session.commit()


def list_booking(status_values):
    formatted_grouped_values = func.group_concat(
        concat(
            Tier.id, '-',
            BookingDetail.num_normal_guest, '-',
            BookingDetail.num_foreigner_guest
        )
    )
    query = db.session.query(Booking, formatted_grouped_values,
                             concat(func.group_concat(Room.name)).label('room_names'),
                             coalesce(concat(User.first_name, User.last_name), 'Khách lẻ').label(
                                 'guest'), concat(func.group_concat(Room.id)).label('room_id')).select_from(
        Booking).join(
        BookingDetail, BookingDetail.booking_id == Booking.id,
        isouter=True).join(User,
                           Booking.booker_id == User.id,
                           isouter=True).join(Room,
                                              BookingDetail.room_id == Room.id,
                                              isouter=True).join(Tier, Tier.id == Room.tier_id).group_by(
        Booking)
    if len(status_values) == 0:
        query = query.all()
    else:
        # status_values ['3,99,5']
        status_enum_values = [BookingStatus(int(value)) for value in status_values[0].split(',')]
        query = query.filter(Booking.status.in_(status_enum_values)).all()

    booking_dict = []
    # Convert to dict
    for booking in query:
        # Lấy ra chuỗi '6-2-1,7-1-2'
        room_details_str = booking[1]

        # Tách chuỗi thành các phần tử riêng biệt dựa trên dấu ','
        room_details_list = room_details_str.split(',')

        # Tạo biến lưu tổng giá cho mỗi đối tượng booking_detail
        booking_detail_total_price = 0

        # Lặp qua từng phần tử trong chuỗi '6-2-1,7-1-2'
        for room_detail in room_details_list:
            # Tách mỗi phần tử thành các số riêng biệt dựa trên dấu '-'
            detail_parts = room_detail.split('-')

            # Lấy ra id của Tier từ phần tử đầu tiên
            tier_id = int(detail_parts[0])

            # Truy vấn CSDL để lấy đối tượng Tier
            tier = db.session.query(Tier).filter_by(id=tier_id).first()

            # Nếu tìm thấy đối tượng Tier
            if tier:
                # Lấy số lượng khách từ phần tử thứ hai và thứ ba
                num_normal_guest = int(detail_parts[1])
                num_foreign_guest = int(detail_parts[2])

                # Tính toán giá từ đối tượng Tier
                price = tier.get_price(num_normal_guest, num_foreign_guest)

                # Cập nhật tổng giá cho mỗi đối tượng booking
                booking_detail_total_price += price
            else:
                print("Tier with ID", tier_id, "not found")

        temp = {
            'booking': booking[0].to_dict(),
            'price': booking_detail_total_price,
            'rooms': booking[2],
            'booker': booking[3],
            'rooms_id': booking[4]
        }
        booking_dict.append(temp)

    return booking_dict


def get_total_price_by_booking_id(id):
    return db.session.query(Tier).join(Room, Room.tier_id == Tier.id).join(BookingDetail,
                                                                           BookingDetail.room_id == Room.id).join(
        Booking, Booking.id == BookingDetail.booking_id).group_by(BookingDetail.room_id).all()

