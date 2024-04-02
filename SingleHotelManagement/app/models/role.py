import enum

from sqlalchemy import Integer, Column, String, Enum
from sqlalchemy.orm import relationship

from app import db


class UserRole(enum.Enum):
    GUEST = "khach"
    RECEPTIONIST = "le tan"
    ADMIN = "quản trị"


class Role(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Enum(UserRole))

    user_role = relationship('User', backref='role', lazy=True)
