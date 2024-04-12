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
        query = query.filter(and_(func.month(Invoice.paid_at) >= from_month, func.month(Invoice.paid_at) <= to_month))
    return query.all()


# Lấy thông tin thống kê doanh thu theo quy, hoặc giữa 2 quys
def get_revenue_by_quarter(from_quarter=None, to_quarter=None):
    query = db.session.query(func.quarter(Invoice.paid_at), func.sum(Invoice.amount)) \
        .where(Invoice.paid.__eq__(True)) \
        .group_by(func.quarter(Invoice.paid_at)) \
        .order_by(func.quarter(Invoice.paid_at))

    if from_quarter and to_quarter:
        query = query.filter(
            and_(func.quarter(Invoice.paid_at) >= from_quarter, func.quater(Invoice.paid_at) <= to_quarter))
    return query.all()


# Lấy thông tin thống kê doanh thu theo quy, hoặc giữa 2 quys
def get_revenue_by_year(from_year=None, to_year=None):
    query = db.session.query(func.year(Invoice.paid_at), func.sum(Invoice.amount)) \
        .where(Invoice.paid.__eq__(True)) \
        .group_by(func.year(Invoice.paid_at)) \
        .order_by(func.year(Invoice.paid_at))

    if from_year and to_year:
        query = query.filter(and_(func.year(Invoice.paid_at) >= from_year, func.year(Invoice.paid_at) <= to_year))
    return query.all()


if __name__ == '__main__':
    with app.app_context():
        print(get_revenue_by_year())
