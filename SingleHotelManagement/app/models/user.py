import enum
from sqlalchemy import Column, String, Boolean, Text, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app import db


class User(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)

    phone_number = Column(String(11), nullable=False,unique=True)
    first_name = Column(String(20), default='', nullable=False)
    last_name = Column(String(40), default='', nullable=False)
    address = Column(Text)
    city = Column(String(100))
    district = Column(String(100))
    birthdate = Column(String(10))
    foreigner = Column(Boolean, default=False)

    accounts = relationship('Account', backref="account", lazy=True)

    guests = relationship('Guest', backref="guests", lazy=True)
    receptionists = relationship('Receptionist', backref="receptionist", lazy=True)
    admins = relationship('Admin', backref="admins", lazy=True)

    notifications = relationship("Notification", backref="notifications", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'phone_number': self.phone_number,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
            'city': self.city,
            'district': self.district,
            'birthdate': self.birthdate,
            'foreigner': self.foreigner,
        }
