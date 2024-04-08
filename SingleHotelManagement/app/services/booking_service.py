from app.repositories.booking_repository import create_booking as crb, get_booking_by_id as gb, \
    list_booking as lb,reserve ,check_in,check_out, cancel_booking as cb


def create_booking(data):
    return crb(data)


def cancel_booking(booking_id):
    cb(booking_id=booking_id)


def get_booking_by_id(id):
    return gb(id).to_dict()


def list_booking(status_values):
    return lb(status_values)


def change_booking_status(booking_id, status):
    booking_id = int(booking_id)
    status = int(status)
    if status == 1:
        reserve(booking_id)
    elif status == 2:
        check_in(booking_id)
    elif status == 3:
        check_out(booking_id)
    elif status == 4:
        cb(booking_id)
