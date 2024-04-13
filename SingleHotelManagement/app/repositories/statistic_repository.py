from sqlalchemy import func, Float, cast, DECIMAL
from sqlalchemy.sql.operators import and_

from app import app, db
from app.models.tier import Tier
from app.models.invoice import Invoice
from app.models.booking import Booking
from app.models.booking_detail import BookingDetail
from app.models.room import Room


# Lấy thông tin thống kê doanh thu theo tháng, hoặc giữa 2 tháng
def get_revenue_by_month(from_month=None, to_month=None):
    query = db.session.query(func.month(Invoice.paid_at), func.sum(Invoice.amount)) \
        .where(Invoice.paid.__eq__(True)) \
        .group_by(func.month(Invoice.paid_at)) \
        .order_by(func.month(Invoice.paid_at))

    if from_month and to_month:
        from_month = int(from_month)
        to_month = int(to_month)
        query = query.filter(and_(func.month(Invoice.paid_at) >= from_month, func.month(Invoice.paid_at) <= to_month))
    return query.all()


# Lấy thông tin thống kê doanh thu theo quy, hoặc giữa 2 quys
def get_revenue_by_quarter(from_quarter=None, to_quarter=None):
    query = db.session.query(func.quarter(Invoice.paid_at), func.sum(Invoice.amount)) \
        .where(Invoice.paid.__eq__(True)) \
        .group_by(func.quarter(Invoice.paid_at)) \
        .order_by(func.quarter(Invoice.paid_at))

    if from_quarter and to_quarter:
        from_quarter = int(from_quarter)
        to_quarter = int(to_quarter)
        query = query.filter(
            and_(func.quarter(Invoice.paid_at) >= from_quarter, func.quarter(Invoice.paid_at) <= to_quarter))
    return query.all()


# Lấy thông tin thống kê doanh thu theo quy, hoặc giữa 2 quys
def get_revenue_by_year(from_year=None, to_year=None):
    query = db.session.query(func.year(Invoice.paid_at), func.sum(Invoice.amount)) \
        .where(Invoice.paid.__eq__(True)) \
        .group_by(func.year(Invoice.paid_at)) \
        .order_by(func.year(Invoice.paid_at))

    if from_year and to_year:
        from_year = int(from_year)
        to_year = int(to_year)
        query = query.filter(and_(func.year(Invoice.paid_at) >= from_year, func.year(Invoice.paid_at) <= to_year))
    return query.all()


def get_frequent_booking_tier_month(from_month=None, to_month=None, tier_id=None):
    query = db.session.query(func.month(BookingDetail.created_at),
                             func.sum(BookingDetail.price),
                             Tier.name) \
        .join(Booking, BookingDetail.booking_id.__eq__(Booking.id)) \
        .join(Invoice, Booking.id.__eq__(Invoice.booking_id)) \
        .filter(Invoice.paid.__eq__(True)) \
        .join(Room, Room.id.__eq__(BookingDetail.room_id)) \
        .join(Tier, Tier.id.__eq__(Room.tier_id))

    if tier_id:
        query = query.filter(Tier.id.__eq__(int(tier_id)))

    if from_month and to_month:
        from_month = int(from_month)
        to_month = int(to_month)
        query = query.filter(
            and_(func.month(BookingDetail.created_at) >= from_month, func.month(BookingDetail.created_at) <= to_month))

    query = query.group_by(func.month(BookingDetail.created_at), Tier.name).order_by(
        func.month(BookingDetail.created_at))

    return query.all()


def get_frequent_booking_tier_quarter(from_quarter=None, to_quarter=None, tier_id=None):
    query = db.session.query(func.quarter(BookingDetail.created_at),
                             func.sum(BookingDetail.price),
                             Tier.name) \
        .join(Booking, BookingDetail.booking_id.__eq__(Booking.id)) \
        .join(Invoice, Booking.id.__eq__(Invoice.booking_id)) \
        .filter(Invoice.paid.__eq__(True)) \
        .join(Room, Room.id.__eq__(BookingDetail.room_id)) \
        .join(Tier, Tier.id.__eq__(Room.tier_id))

    if tier_id:
        query = query.filter(Tier.id.__eq__(int(tier_id)))

    if from_quarter and to_quarter:
        from_quarter = int(from_quarter)
        to_quarter = int(to_quarter)
        query = query.filter(and_(func.quarter(BookingDetail.created_at) >= from_quarter,
                                  func.quarter(BookingDetail.created_at) <= to_quarter))

    query = query.group_by(func.quarter(BookingDetail.created_at), Tier.name).order_by(
        func.quarter(BookingDetail.created_at))

    return query.all()


def get_frequent_booking_tier_year(from_year=None, to_year=None, tier_id=None):
    query = db.session.query(func.year(BookingDetail.created_at),
                             func.sum(BookingDetail.price),
                             Tier.name) \
        .join(Booking, BookingDetail.booking_id.__eq__(Booking.id)) \
        .join(Invoice, Booking.id.__eq__(Invoice.booking_id)) \
        .filter(Invoice.paid.__eq__(True)) \
        .join(Room, Room.id.__eq__(BookingDetail.room_id)) \
        .join(Tier, Tier.id.__eq__(Room.tier_id))

    if tier_id:
        query = query.filter(Tier.id.__eq__(int(tier_id)))

    if from_year and to_year:
        from_year = int(from_year)
        to_year = int(to_year)
        query = query.filter(
            and_(func.year(BookingDetail.created_at) >= from_year, func.year(BookingDetail.created_at) <= to_year))

    query = query.group_by(func.year(BookingDetail.created_at), Tier.name).order_by(func.year(BookingDetail.created_at))

    return query.all()


if __name__ == '__main__':
    with app.app_context():
        print(get_frequent_booking_tier_month())
