from app.repositories.guest_repository import is_phone_number_exist, register_guest as rg


def check_phone_number(phone_numer=None):
    return is_phone_number_exist(phone_number=phone_numer)


def register_guest(data):
    return rg(data=data)
