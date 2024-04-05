from app import db
from app.models.booking import Booking, BookingStatus
def create_booking(data):
    booking = Booking(
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        checkin=data.get('checkin'),
        checkout=data.get('checkout'),
        status=BookingStatus.REQUESTED,
        receptionist_id=data.get('receptionist_id'),
    )
    db.session.add(booking)
    db.session.commit()
    return booking