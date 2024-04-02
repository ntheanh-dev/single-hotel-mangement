from app.models.floor import Floor
from app import db


def get_all_floor():
    return db.session.query(Floor).all()
