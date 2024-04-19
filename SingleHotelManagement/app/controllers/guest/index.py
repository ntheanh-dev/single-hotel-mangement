import json
from flask import render_template, jsonify, request
from app import app
from app.services.tier_service import get_tiers, convert_get_tiers_to_dict
from app.services.booking_service import create_booking_online

@app.route('/trang-chu/')
def guest_home():
    return render_template('/guest/index.html')


@app.route('/trang-chu/dat-phong/')
def guest_booked_room():
    return render_template('/guest/booked-room.html')


@app.route('/api/room/', methods=['GET'])
def list_room():
    tiers = get_tiers()
    tiers_dict = convert_get_tiers_to_dict(tiers)
    return jsonify(tiers_dict)


@app.route('/api/reception/make-booking-online/', methods=['post'])
def make_booking_online():
    data = json.loads(request.data)
    listData = {
        'booker_id': data.get('booker_id'),
        'start_date': data.get('start_date'),
        'end_date': data.get('end_date'),
        'rooms': data.get('booked_room'),
        'foreigner': data.get('foreigner')
    }
    try:
        result = create_booking_online(data=listData)
        # return jsonify('error')
    except Exception as e:
        print(e)
        return jsonify('error')
    return jsonify(result)
