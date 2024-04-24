from app.repositories.guest_repository import is_phone_number_exist, register_guest as rg, search_guest_by_phone_number, \
    search_guest_by_address, search_guest_by_name,count_guest as count_g
from flask import jsonify
from distutils.util import strtobool


def check_phone_number(phone_numer=None):
    return is_phone_number_exist(phone_number=phone_numer)


def register_guest(data):
    return rg(data=data)


def search_guest(data):
    results = []
    if data.get('foreigner') == 'All':
        data['foreigner'] = None
    else:
        data['foreigner'] = strtobool(data['foreigner'].lower())
    if data.get('search_type') == '1':
        results = search_guest_by_name(name=data['search_guest'], foreigner=data['foreigner'])
    elif data.get('search_type') == '2':
        results = search_guest_by_phone_number(phone_number=data['search_guest'],foreigner=data['foreigner'])
    elif data.get('search_type') == '3':
        results = search_guest_by_address(address=data['search_guest'], foreigner=data['foreigner'])
    user_info_list = [result.to_dict() for result in results]
    return jsonify(user_info_list)


def count_guest():
    return count_g()