import enum
from datetime import datetime

from flask_login import UserMixin
from sqlalchemy import Column, String, Boolean, Text, DateTime, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship

from app import db


class UserRole(enum.Enum):
    GUEST = 1
    RECEPTIONIST = 2
    ADMIN = 3


class Account(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)

    username = Column(String(20), unique=True, nullable=False)
    password = Column(String(40), nullable=False)
    avatar = Column(String(200),
                    default='https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860995/rooms/avatar_vuwmxd.jpg')
    gmail = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)
    joined_date = Column(DateTime, default=datetime.now())

    role = Column(Enum(UserRole), default=UserRole.GUEST)

    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    notifications = relationship("Notification", backref="notifications", lazy=True)
