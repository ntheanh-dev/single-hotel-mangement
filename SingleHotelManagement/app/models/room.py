import enum
from sqlalchemy import Column, String, Boolean, Text, DateTime, Integer, ForeignKey, event, Enum
from sqlalchemy.orm import relationship
from app import db


class RoomStatus(enum.Enum):
    AVAILABLE = 1
    REVERED = 2
    OCCUPIED = 3


class Room(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(40), nullable=False)
    floor_id = Column(Integer, ForeignKey('floor.id'), nullable=False)
    status = Column(Enum(RoomStatus))
    image = Column(String(255),
                   default='https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860957/rooms/room_2-1_c4yatw.png',
                   nullable=True)
    tier_id = Column(Integer, ForeignKey('tier.id'))

    # one to many
    images = relationship("Image", backref="image", lazy=False)

    # many to many with intermediate table
    bookings = relationship("Booking", backref="booking", lazy=True)
