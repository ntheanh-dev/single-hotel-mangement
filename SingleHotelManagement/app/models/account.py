from datetime import datetime

from flask_login import UserMixin
from sqlalchemy import Column, String, Boolean, Text, DateTime, Integer, ForeignKey
from app import db


class Account(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)

    username = Column(String(20), unique=True, nullable=False)
    password = Column(String(40), nullable=False)
    avatar = Column(String(200), default='https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860995/rooms/avatar_vuwmxd.jpg')
    gmail = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)
    joined_date = Column(DateTime, default=datetime.now())

    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True,nullable=False)

