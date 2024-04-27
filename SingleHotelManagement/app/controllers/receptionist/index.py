import json
from distutils.util import strtobool
from flask import render_template, request, jsonify, redirect
from app import app
from app.models.booking import BookingStatus
from app.models.account import UserRole
from app.repositories.tier_repository import get_tier_by_room_id
from app.services.booking_detail_service import get_booking_details_by_booking_id, add_guest_to_booking_detail as ad, \
    change_num_guest as cng, add_booking_detail_in_booking
from app.services.guest_service import check_phone_number, register_guest, search_guest as sg
from app.services.tier_service import get_tiers, get_max_guests, tier_with_available_room_to_dict
from app.services.floor_service import get_floors
from app.services.booking_service import create_booking_offline, get_booking_by_id, cancel_booking as cb, list_booking, \
    change_booking_status as cbs, check_out_with_check_payment as cowcp, check_out as co
from app.services.payment_service import is_paid as ip
from app.services.payment_service import payment as pm
from app.utils.decorator import required_role
from flask_login import current_user
from app.services.notification_service import CreateNotif


@app.route('/nhan-vien/lich-dat-phong/')
@required_role(UserRole.RECEPTIONIST)
def receptionist_home():
    status_values = request.args.getlist('trang-thai')
    #Mặc định chỉ hiện các đơn đặt online, đã đặt trước, đã check_in
    if len(status_values) == 0:
        status_values.append('1,2,3')
    bookings = list_booking(status_values)

    return render_template('/receptionist/index.html', bookings=bookings, booking_status=BookingStatus)


@app.route('/nhan-vien/dat-phong/')
@required_role(UserRole.RECEPTIONIST)
def receptionist_booking():
    floors = get_floors()
    max_guests = get_max_guests()
    booking_id = request.args.get('ma')

    if not booking_id:
        max_guest = request.args.get('max_guest')
        floor = request.args.get('floor')
        tiers = get_tiers(max_guest=max_guest, floor=floor)
        return render_template('/receptionist/booking.html', tiers=tiers, floors=floors, max_guests=max_guests)
    else:
        booking = get_booking_by_id(int(booking_id))
        is_paid = ip(booking_id)
        if booking['status'] != 'REQUESTED':
            return redirect('/nhan-vien/dat-phong/')

        max_guest = request.args.get('max_guest')
        floor = request.args.get('floor')
        tiers = get_tiers(max_guest=max_guest, floor=floor)

        room_id = request.args.get('phong')

        booking_details = get_booking_details_by_booking_id(int(booking_id))
        current_booking_detail = {}
        total_price = 0
        for bd in booking_details:
            total_price += bd['price']
            if bd['room_id'] == int(room_id):
                current_booking_detail = bd
        current_tier = get_tier_by_room_id(int(room_id))
        return render_template('/receptionist/booking_detail.html',
                               current_tier=current_tier,
                               booking_details=booking_details,
                               booking=booking,
                               current_booking_detail=current_booking_detail,
                               tiers=tiers, floors=floors, max_guests=max_guests, total_price=total_price,
                               is_paid=is_paid
                               )


@app.route('/api/reception/add-room/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def add_room():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    tier_id = data.get('tier_id')
    try:
        result = add_booking_detail_in_booking(booking_id, tier_id)
        return jsonify(result)
    except Exception as e:
        print("-------------------")
        print(e)
        print("-------------------")
        return jsonify('error')


@app.route('/api/reception/search-tier/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
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


@app.route('/api/reception/make-booking-offline/', methods=['post'])
def make_booking_offline():
    data = json.loads(request.data)
    listData = {
        'receptionist_id': current_user.user_id,
        'booker_id': data.get('booker_id'),
        'start_date': data.get('start_date'),
        'end_date': data.get('end_date'),
        'tier_id': data.get('tier_id'),
        'foreigner': data.get('foreigner')
    }
    try:
        result = create_booking_offline(data=listData)
        CreateNotif.booking_offline(data.get('booker_id'))
    except Exception as e:
        print(e)
        return jsonify('error')
    return jsonify(result)


@app.route('/api/reception/search-guest/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def search_guest():
    data = json.loads(request.data)
    return sg(data)


@app.route('/api/reception/add-guest/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def add_guest_to_booking_detail():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    foreigner = data.get('foreigner')
    room_id = data.get('room_id')
    return ad(booking_id=booking_id, foreigner=foreigner, room_id=room_id)


@app.route('/api/reception/change-num-guest/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def change_num_guest_in_booking_detail():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    num_foreigner_guest = data.get('num_foreigner_guest')
    num_normal_guest = data.get("num_normal_guest")
    room_id = data.get('room_id')
    return cng(booking_id=booking_id, num_foreigner_guest=num_foreigner_guest, num_normal_guest=num_normal_guest,
               room_id=room_id)


@app.route('/api/receptionist/cancel/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def cancel_booking():
    data = json.loads(request.data)

    booking_id = data.get('booking_id')
    try:
        cb(booking_id=int(booking_id))

        recep = current_user
        CreateNotif.cancel_booking(account_id=recep.id, booking_id=booking_id)
    except Exception as e:
        print(e)
        return jsonify(False)
    return jsonify(True)


@app.route('/api/receptionist/change-booking-status/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def change_booking_status():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    status = data.get('status')
    try:
        cbs(booking_id, status)
        return jsonify('01')
    except Exception as e:
        return jsonify('00')


@app.route('/api/receptionist/check_out/', methods=['post'])
@required_role(UserRole.RECEPTIONIST)
def check_out():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    result = cowcp(booking_id)
    return jsonify(result)


@app.route('/api/receptionist/payment/', methods=['post'])
def payment():
    data = json.loads(request.data)
    booking_id = data.get('booking_id')
    payment_method = data.get('payment_method')
    current_booking_detail_id = data.get('current_booking_detail_id')
    additional_action = data.get('additional_action')
    try:
        result = pm(booking_id, payment_method, current_booking_detail_id)
        if additional_action == 'CHECK_OUT':
            co(booking_id)
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify('00')
