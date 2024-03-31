from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import DECIMAL

from app import db


class Tier(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    max_guest = Column(Integer, default=3)
    base_price = Column(DECIMAL)
    normal_guest_count = Column(Integer, default=2)
    extra_guest_surcharge = Column(Float, default=0.25)
    foreign_guest_surcharge = Column(Float, default=1.5)
    # one to many
    rooms = relationship("Room", backref="room", lazy=True)
