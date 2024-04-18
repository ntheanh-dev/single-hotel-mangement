from sqlalchemy import and_

from app import db
from app.models.booking import Booking
from app.models.invoice import Invoice


def is_paid(booking_id):
    query = db.session.query(Invoice).filter(and_(Invoice.paid.__eq__(True),Invoice.booking_id.__eq__(int(booking_id)))).first()
    return query is not None