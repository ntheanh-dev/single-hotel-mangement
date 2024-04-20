from app.repositories.booking_repository import create_booking_offline as crbo, create_booking_online as crbon, \
    get_booking_by_id as gb, \
    list_booking as lb, reserve as rs, check_in as ci, check_out as co, cancel_booking as cb, \
    count_booking as count_b, retrieve_booking as rb
from app.services.payment_service import is_paid as ip
from app.services.booking_detail_service import get_booking_detail_with_price
from app.services.notification_service import CreateNotif
from flask_login import current_user

def create_booking_offline(data):
    return crbo(data)


def create_booking_online(data):
    return crbon(data)


def cancel_booking(booking_id):
    cb(booking_id=booking_id)


def get_booking_by_id(id):
    return gb(id).to_dict()


def list_booking(status_values=None, limit=None):
    return lb(status_values, limit)


def get_info_booking(booking_id):
    booking = get_booking_by_id(booking_id)
    booking_details = get_booking_detail_with_price(booking_id)
    result = {
        'booking': booking,
        'booking_details': booking_details
    }
    return result


def retrieve_booking(booking_id):
    return rb(int(booking_id))


def check_out_with_check_payment(booking_id):
    is_paid = ip(booking_id)
    if is_paid:
        co(booking_id)
        recep = current_user
        CreateNotif.cancel_booking(account_id=recep.id, booking_id=booking_id)
        return '00'
    else:
        return '01'


def check_out(booking_id):
    co(booking_id)


def change_booking_status(booking_id, status):
    booking_id = int(booking_id)
    status = int(status)
    if status == 1:
        rs(booking_id)
    elif status == 2:
        ci(booking_id)
    elif status == 3:
        co(booking_id)
    elif status == 4:
        cb(booking_id)


def count_booking():
    return count_b()
