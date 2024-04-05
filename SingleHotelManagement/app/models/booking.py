import enum
from datetime import datetime

from sqlalchemy import Column, Text, DateTime, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship

from app import db


class BookingStatus(enum.Enum):
    REQUESTED = 1
    CONFIRMED = 2
    CHECKED_IN = 3
    CHECKED_OUT = 4
    CANCELED = 5


class Booking(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    start_date = Column(DateTime, default=datetime.now())
    end_date = Column(DateTime)
    checkin = Column(DateTime)
    checkout = Column(DateTime)
    status = Column(Enum(BookingStatus))
    note = Column(Text)
    # one to many
    receptionist_id = Column(Integer, ForeignKey('receptionist.user_id'), primary_key=True, nullable=False)
    booker_id = Column(Integer, ForeignKey('guest.user_id'), primary_key=True, nullable=True)

    # many to many with intermediate table
    booking_details = relationship("BookingDetail", backref="booking", lazy=True)

    # one-to-one relationship
    invoice = relationship("Invoice", backref="booking",lazy=False)

    def to_dict(self):
        return {
            'id': self.id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'checkin': self.checkin,
            'checkout': self.checkout,
            'status': self.status.name,
            'note': self.note,
            'receptionist_id': self.receptionist_id,
            'booker_id': self.booker_id,
        }