from app.repositories.booking_repository import create_booking as crb, get_booking_by_id as gb, \
    list_booking as lb, reserve, check_in, check_out as co, cancel_booking as cb, is_paid as ip, \
    count_booking as count_b
from app.services.booking_detail_service import get_booking_detail_with_price


def create_booking(data):
    return crb(data)


def cancel_booking(booking_id):
    cb(booking_id=booking_id)


def get_booking_by_id(id):
    return gb(id).to_dict()


def list_booking(status_values=None):
    return lb(status_values)


def get_info_booking(booking_id):
    booking = get_booking_by_id(booking_id)
    booking_details = get_booking_detail_with_price(booking_id)
    result = {
        'booking': booking,
        'booking_details': booking_details
    }
    return result


def check_out_with_check_payment(booking_id):
    is_paid = ip(booking_id)
    if is_paid:
        co(booking_id)
        return '00'
    else:
        return '01'


def check_out(booking_id):
    co(booking_id)


def change_booking_status(booking_id, status):
    booking_id = int(booking_id)
    status = int(status)
    if status == 1:
        reserve(booking_id)
    elif status == 2:
        check_in(booking_id)
    elif status == 3:
        co(booking_id)
    elif status == 4:
        cb(booking_id)


def count_booking():
    return count_b()
