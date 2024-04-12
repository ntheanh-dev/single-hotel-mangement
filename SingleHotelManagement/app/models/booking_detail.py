from datetime import datetime

from sqlalchemy import Column, Integer, ForeignKey, DateTime, DECIMAL
from app import db


class BookingDetail(db.Model):
    # primary keys
    booking_id = Column(Integer, ForeignKey('booking.id'), primary_key=True)
    room_id = Column(Integer, ForeignKey('room.id'), primary_key=True)

    # many to many with intermediate table
    num_normal_guest = Column(Integer, default=0)
    num_foreigner_guest = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now())
    price = Column(DECIMAL, nullable=False, default=0)

    def to_dict(self):
        return {
            'booking_id': self.booking_id,
            'room_id': self.room_id,
            'num_normal_guest': self.num_normal_guest,
            'num_foreigner_guest': self.num_foreigner_guest,
            'price': self.price
        }

    def set_price(self, price):
        self.price = price
