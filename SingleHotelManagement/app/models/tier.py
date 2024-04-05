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
    rooms = relationship("Room", backref="tier", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'max_guest': self.max_guest,
            'base_price': self.base_price,
            'normal_guest_count': self.normal_guest_count,
            'extra_guest_surcharge': self.extra_guest_surcharge,
            'foreign_guest_surcharge': self.foreign_guest_surcharge
        }
    
    def get_price(self, normal_guest_count, foreign_count):
        price = float(self.base_price)
        if normal_guest_count + foreign_count > self.normal_guest_count:
            price += price * self.extra_guest_surcharge
        if foreign_count > 0:
            price = price * self.foreign_guest_surcharge
        return price