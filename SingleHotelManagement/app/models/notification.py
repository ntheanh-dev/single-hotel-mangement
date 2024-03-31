from datetime import datetime
from enum import Enum

from flask_login import UserMixin
from sqlalchemy import Column, String, Boolean, Text, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app import db
from app.models.role import UserRole


class Notification(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    created_date = Column(DateTime, default=datetime.now())
    content = Column(Text)
