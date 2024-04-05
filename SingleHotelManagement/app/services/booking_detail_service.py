from app.repositories.booking_detail import get_booking_details_by_booking_id as gbd
from app.repositories.booking_repository import get_booking_by_id
from app.repositories.room_repository import get_room_by_id


def get_booking_details_by_booking_id(booking_id):
    booking_details = gbd(booking_id=booking_id)
    result = [bd.to_dict() for bd in booking_details]

    for booking_detail in result:
        # Lấy thông tin phòng từ room_id
        room_info = get_room_by_id(booking_detail['room_id']).to_dict()
        # Cập nhật booking_details với thông tin mới từ phòng
        booking_detail['room_info'] = room_info

    return result

