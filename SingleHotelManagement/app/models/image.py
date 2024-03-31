from app import db
from sqlalchemy import Column, String, Integer, ForeignKey


class Image(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(255))

    room_id = Column(Integer, ForeignKey('room.id'), nullable=False)
