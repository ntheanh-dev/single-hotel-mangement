from sqlalchemy import Column,Integer, ForeignKey
from app import db


class BookingDetail(db.Model):
    # primary keys
    booking_id = Column(Integer, ForeignKey('booking.id'), primary_key=True)
    room_id = Column(Integer, ForeignKey('room.id'), primary_key=True)

    # many to many with intermediate table
    num_normal_guest = Column(Integer, default=1)
    num_foreigner_guest = Column(Integer, default=0)
