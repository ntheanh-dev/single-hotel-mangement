from app.repositories.booking_detail_repository import get_booking_details_by_booking_id as gbd, \
    add_guest_to_booking_detail as ag, check_max_guest, change_num_guest as cng, \
    get_booking_detail_with_tier_by_booking_id as gbkdwt
from app.repositories.booking_repository import get_booking_by_id
from app.repositories.room_repository import get_room_by_id
from app.repositories.tier_repository import get_tier_by_id
from flask import jsonify


def get_booking_details_by_booking_id(booking_id):
    booking_details = gbd(booking_id=booking_id)
    result = [bd.to_dict() for bd in booking_details]

    for booking_detail in result:
        # Lấy thông tin phòng từ room_id
        room_info = get_room_by_id(booking_detail['room_id']).to_dict()
        # Cập nhật booking_details với thông tin mới từ phòng
        booking_detail['room_info'] = room_info

    return result


def get_booking_detail_with_price(booking_id):
    booking_details = gbkdwt(booking_id)
    result = []
    for b in booking_details:
        booking_detail = b[0].to_dict()
        tier = get_tier_by_id(int(b[1]))
        result.append({
            'tier_name': b[2],
            'price': tier.get_price(booking_detail['num_normal_guest'], booking_detail['num_foreigner_guest']),
            'booking_detail': booking_detail,
            'room_name': b[3]
        })
    return result


def add_guest_to_booking_detail(booking_id, foreigner, room_id):
    max_guest = check_max_guest(room_id)
    if max_guest:
        return jsonify("False")
    else:
        return jsonify(ag(booking_id, room_id, foreigner))


def change_num_guest(booking_id, num_foreigner_guest, num_normal_guest, room_id):
    is_max_guest = check_max_guest(room_id, num_foreigner_guest, num_normal_guest)
    if is_max_guest:
        return jsonify(False)
    else:
        return jsonify(cng(booking_id, num_foreigner_guest, num_normal_guest, room_id))
