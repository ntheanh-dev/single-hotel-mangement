from app import db
from app.models.booking_detail import BookingDetail


def get_booking_details_by_booking_id(booking_id):
    return db.session.query(BookingDetail).filter(BookingDetail.booking_id == booking_id).all()