from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models import user
from app import db


class Admin(db.Model):
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True, nullable=False)
