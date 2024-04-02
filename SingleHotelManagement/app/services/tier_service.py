from app.repositories.tier_repository import get_tier_has_available_room, get_distinct_max_guest


def get_tiers(floor, max_guest):
    if floor and floor == 'all':
        floor = None
    if max_guest and max_guest == 'all':
        max_guest = None
    return get_tier_has_available_room(max_guest=max_guest, floor=floor)


def get_max_guests():
    return get_distinct_max_guest()
