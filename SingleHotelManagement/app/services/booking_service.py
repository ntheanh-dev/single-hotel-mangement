from app.repositories.booking_repository import create_booking as cb
from app.repositories.booking_repository import get_booking_by_id as gb


def create_booking(data):
    return cb(data)


def get_booking_by_id(id):
    return gb(id).to_dict()
