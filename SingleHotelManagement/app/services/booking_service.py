from app.repositories.booking_repository import create_booking as crb, get_booking_by_id as gb, cancel_booking as cb, \
    list_booking as lb


def create_booking(data):
    return crb(data)


def cancel_booking(booking_id):
    cb(booking_id=booking_id)


def get_booking_by_id(id):
    return gb(id).to_dict()


def list_booking(status_values):
    return lb(status_values)
