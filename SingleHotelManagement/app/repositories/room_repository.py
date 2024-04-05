from app import db
from app.models.room import Room, RoomStatus


def get_available_rooms_by_tier_id(tier_id):
    return db.session.query(Room).filter(Room.tier_id.__eq__(tier_id)).filter(
        Room.status.__eq__(RoomStatus.AVAILABLE)).all()


def change_status_room_by_id(room_id, status):
    room = db.session.query(Room).filter(Room.id.__eq__(room_id)).first()
    room.status = status
    db.session.commit()
    return room


def get_room_by_id(id):
    return db.session.query(Room).filter(Room.id == id).first()
