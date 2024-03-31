import enum
from sqlalchemy import Column, Boolean, Integer, ForeignKey, event, Enum
from sqlalchemy.dialects.mysql import DECIMAL
from app import db


class PaymentMethod(enum.Enum):
    CASH = 1
    VNPAY = 2


class Invoice(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(DECIMAL, nullable=False)
    paid = Column(Boolean, default=False)
    payment_method = Column(Enum(PaymentMethod))

    # one-to-one relationship
    booking_id = Column(Integer, ForeignKey('booking.id'))
