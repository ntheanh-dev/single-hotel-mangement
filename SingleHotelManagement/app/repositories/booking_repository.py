from app import db
from app.models.booking import Booking, BookingStatus
from app.models.booking_detail import BookingDetail
from app.models.room import Room, RoomStatus
from distutils.util import strtobool


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

    booking_details = db.session.query(Room).join(BookingDetail, Room.id == BookingDetail.room_id).filter(
        BookingDetail.booking_id == booking_id).all()

    # Cập nhật trạng thái của các phòng
    for room in booking_details:
        room.status = RoomStatus.AVAILABLE

    # Lưu các thay đổi vào cơ sở dữ liệu
    db.session.commit()
