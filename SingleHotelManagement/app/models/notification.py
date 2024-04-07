from datetime import datetime
from sqlalchemy import Column, Text, DateTime, Integer, ForeignKey,Boolean

from app import db


class Notification(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    created_date = Column(DateTime, default=datetime.now())
    content = Column(Text)
    read = Column(Boolean, default=False)
