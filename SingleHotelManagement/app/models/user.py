import enum
from flask_login import UserMixin
from sqlalchemy import Column, String, Boolean, Text, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app import db


class UserRole(enum.Enum):
    GUEST = "khach"
    RECEPTIONIST = "le tan"
    ADMIN = "quản trị"


class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)

    phone_number = Column(String(11), nullable=False)
    first_name = Column(String(20), default='', nullable=False)
    last_name = Column(String(40), default='', nullable=False)
    address = Column(Text)
    city = Column(String(100))
    district = Column(String(100))
    birthdate = Column(String(10))
    foreigner = Column(Boolean, default=False)

    role = Column(Enum(UserRole))

    accounts = relationship('Account', backref="account", lazy=True)

    guests = relationship('Guest', backref="guests", lazy=True)
    receptionists = relationship('Receptionist', backref="receptionist", lazy=True)
    admins = relationship('Admin', backref="admins", lazy=True)

    notifications = relationship("Notification", backref="notifications", lazy=True)
