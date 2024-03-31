from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from app import db


class Floor(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(40), default='', nullable=False)

    rooms = relationship('Room',backref='room',lazy=True)
