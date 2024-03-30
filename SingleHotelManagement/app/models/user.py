from datetime import datetime

from flask_login import UserMixin
from sqlalchemy import Column, String, Boolean, Text, DateTime, Integer, ForeignKey
from app import db


class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)

    username = Column(String(20), unique=True, nullable=False)
    password = Column(String(40), nullable=False)
    avatar = Column(String(200), default='https://res.cloudinary.com/attt92bookstore/image/upload/v1646017546/account'
                                         '/default_ho5q85.png')
    gmail = Column(String(50), nullable=False)
    phone_number = Column(String(11), nullable=False)
    is_active = Column(Boolean, default=True)
    joined_date = Column(DateTime, default=datetime.now())

    first_name = Column(String(20), default='', nullable=False)
    last_name = Column(String(40), default='', nullable=False)
    gender = Column(String(20), default='male')
    address = Column(Text)
    city = Column(String(100))
    district = Column(String(100))
    birthdate = Column(DateTime())
    foreigner = Column(Boolean, default=False)

    role_id = Column(Integer, ForeignKey('role.id'), nullable=False)
