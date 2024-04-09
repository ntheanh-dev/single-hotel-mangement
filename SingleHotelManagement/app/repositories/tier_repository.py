from sqlalchemy import func, Float, cast, DECIMAL

from app import app, db
from app.models.room import Room, RoomStatus
from app.models.tier import Tier


def get_tier_has_available_room(floor=None, max_guest=None):
    query = db.session.query(Tier.id, Tier.name, Tier.max_guest, Tier.base_price, Tier.normal_guest_count,
                             Tier.extra_guest_surcharge, Tier.foreign_guest_surcharge,
                             func.count(Room.id).label('available'),
                             cast(Tier.base_price + Tier.base_price * Tier.extra_guest_surcharge, DECIMAL).label(
                                 'surcharge')).join(Room, Room.tier_id == Tier.id,
                                                    isouter=True).group_by(Tier.id,
                                                                           Tier.name).filter(
        Room.status.__eq__(RoomStatus.AVAILABLE))
    if floor:
        query = query.filter(Room.floor_id.__eq__(int(floor)))
    if max_guest:
        query = query.filter(Tier.max_guest.__eq__(int(max_guest)))
    return query.all()


def get_distinct_max_guest():
    return db.session.query(Tier.max_guest).distinct().order_by(Tier.max_guest).all()


def get_num_available_room_by_id(id):
    return db.session.query(func.count(Room.id).label('available')).join(Tier, Room.tier_id == Tier.id).filter(
        Room.status.__eq__(RoomStatus.AVAILABLE)).filter(Tier.id.__eq__(id)).first()


def get_tier_by_room_id(room_id):
    return db.session.query(Tier).join(Room).filter(Room.id == room_id).first()


def get_tier_by_id(tier_id):
    return db.session.query(Tier).filter(Tier.id == tier_id).first()
