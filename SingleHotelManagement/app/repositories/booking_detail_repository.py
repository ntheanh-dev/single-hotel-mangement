from app import db
from app.models.booking_detail import BookingDetail
from app.repositories.tier_repository import get_tier_by_room_id
from distutils.util import strtobool


def get_booking_details_by_booking_id(booking_id):
    return db.session.query(BookingDetail).filter(BookingDetail.booking_id == booking_id).all()


def add_guest_to_booking_detail(booking_id, room_id, foreigner):
    booking_detail = db.session.query(BookingDetail).filter(BookingDetail.room_id == room_id,
                                                            BookingDetail.booking_id == booking_id).first()
    if strtobool(foreigner):
        booking_detail.num_foreigner_guest += 1
    else:
        booking_detail.num_normal_guest += 1
    db.session.commit(booking_detail)
    return True


def change_num_guest(booking_id, num_foreigner_guest, num_normal_guest, room_id):
    booking_detail = db.session.query(BookingDetail).filter(BookingDetail.room_id == int(room_id),
                                                            BookingDetail.booking_id == int(booking_id)).first()
    booking_detail.num_foreigner_guest = int(num_foreigner_guest)
    booking_detail.num_normal_guest = int(num_normal_guest)
    db.session.commit()
    return True


def check_max_guest(room_id,num_foreigner_guest, num_normal_guest):
    tier = get_tier_by_room_id(room_id)
    return (int(num_foreigner_guest) + int(num_normal_guest)) >= tier.max_guest
