from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app import db


class Receptionist(db.Model):
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True, nullable=False)

    bookings = relationship('Booking',backref='receptionist',lazy=True)

