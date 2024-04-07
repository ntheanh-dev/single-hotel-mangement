import json
from distutils.util import strtobool
from flask import render_template, request, jsonify
from app import app
from app.repositories.tier_repository import get_tier_by_room_id
from app.services.booking_detail_service import get_booking_details_by_booking_id, add_guest_to_booking_detail as ad, \
    change_num_guest as cng
from app.services.guest_service import check_phone_number, register_guest, search_guest as sg
from app.services.tier_service import get_tiers, get_max_guests, tier_with_available_room_to_dict
from app.services.floor_service import get_floors
from app.services.booking_service import create_booking, get_booking_by_id,cancel_booking as cb


@app.route('/nhan-vien/lich-dat-phong/')
def home():
    return render_template('/receptionist/index.html')


@app.route('/nhan-vien/dat-phong/')
def booking():
    floors = get_floors()
    max_guests = get_max_guests()
    booking_id = request.args.get('ma')

    if not booking_id:
        max_guest = request.args.get('max_guest')
        floor = request.args.get('floor')
        tiers = get_tiers(max_guest=max_guest, floor=floor)
        return render_template('/receptionist/booking.html', tiers=tiers, floors=floors, max_guests=max_guests)
    else:

        max_guest = request.args.get('max_guest')
        floor = request.args.get('floor')
        tiers = get_tiers(max_guest=max_guest, floor=floor)

        room_id = request.args.get('phong')
        booking = get_booking_by_id(int(booking_id))
        booking_details = get_booking_details_by_booking_id(int(booking_id))
        current_booking_detail = {}
        for bd in booking_details:
            if bd['room_id'] == int(room_id):
                current_booking_detail = bd
                break
        current_tier = get_tier_by_room_id(int(room_id))
        current_price = current_tier.get_price(current_booking_detail['num_normal_guest'],
                                               current_booking_detail['num_foreigner_guest'])
        return render_template('/receptionist/booking_detail.html',
                               current_tier=current_tier,
                               booking_details=booking_details,
                               booking=booking,
                               current_booking_detail=current_booking_detail,
                               current_price="{:,.0f}".format(current_price),
                               tiers=tiers, floors=floors, max_guests=max_guests
                               )


@app.route('/api/reception/search-tier/', methods=['post'])
def search_tier():
    data = json.loads(request.data)
    floors = data.get('floors')
    max_guests = data.get('max_guests')
    tiers = get_tiers(max_guest=max_guests, floor=floors)
    results = tier_with_available_room_to_dict(tiers)
    return jsonify(results)


@app.route('/api/reception/add-guest/', methods=['post'])
def add_guest():
    data = json.loads(request.data)
    listData = {
        'last_name': data.get('last_name'),
        'first_name': data.get('first_name'),
        'birthdate': data.get('birthdate'),
        'phone_number': data.get('phone_number'),
        'city': data.get('city'),
        'district': data.get('district'),
        'address': data.get('address'),
        'foreigner': strtobool(data.get('foreigner').lower())
    }
    if check_phone_number(listData['phone_number']):  # user đã tồn tại
        return jsonify('0')

    try:
        result = register_guest(data=listData)
        return jsonify(result.to_dict())
    except Exception as e:
        print(e)
        return jsonify('-1')


@app.route('/api/reception/make-booking/', methods=['post'])
def make_booking():
    data = json.loads(request.data)
    listData = {
        'receptionist_id': 2,
        'booker_id': data.get('booker_id'),
        'start_date': data.get('start_date'),
        'end_date': data.get('end_date'),
        'tier_id': data.get('tier_id'),
        'foreigner': data.get('foreigner')
    }
    try:
        result = create_booking(data=listData)
    except Exception as e:
        print(e)
        return jsonify('error')
    return jsonify(result)


@app.route('/api/reception/search/', methods=['post'])
def search_guest():
    data = json.loads(request.data)

    return sg(data)


@app.route('/api/reception/add-guest/', methods=['post'])
def add_guest_to_booking_detail():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    foreigner = data.get('foreigner')
    room_id = data.get('room_id')
    return ad(booking_id=booking_id, foreigner=foreigner, room_id=room_id)


@app.route('/api/reception/change-num-guest/', methods=['post'])
def change_num_guest_in_booking_detail():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    num_foreigner_guest = data.get('num_foreigner_guest')
    num_normal_guest = data.get("num_normal_guest")
    room_id = data.get('room_id')
    return cng(booking_id=booking_id, num_foreigner_guest=num_foreigner_guest, num_normal_guest=num_normal_guest,
               room_id=room_id)


@app.route('/api/receptionist/cancel/', methods=['post'])
def cancel_booking():
    data = json.loads(request.data)

    booking_id = data.get('booking_id')
    try:
        cb(booking_id=int(booking_id))
    except Exception as e:
        print(e)
        return jsonify(False)
    return jsonify(True)
