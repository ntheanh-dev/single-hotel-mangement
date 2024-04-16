from sqlalchemy import func, and_, extract
from app import app, db
from app.models.invoice import Invoice
from app.models.booking import Booking
from app.models.booking_detail import BookingDetail
from app.models.room import Room


def get_revenue_with_date_detail(month, quarter, year):
    query = db.session.query(Invoice.paid_at, func.sum(Invoice.amount)).filter(Invoice.paid.__eq__(True))

    if month is not None:
        query = query.filter(func.month(Invoice.paid_at) == int(month))

    if quarter is not None:
        query = query.filter(func.quarter(Invoice.paid_at) == int(quarter))

    if year is not None:
        query = query.filter(func.year(Invoice.paid_at) == int(year))

    return query.group_by(Invoice.paid_at).order_by(Invoice.paid_at).all()


def get_revenue(day, month, year):
    if day is not None:
        return db.session.query(func.extract('hour', Invoice.paid_at).label('hour'), \
                                func.sum(Invoice.amount).label('total_revenue') \
                                ).filter(
            extract('day', Invoice.paid_at) == day,
            extract('month', Invoice.paid_at) == month,
            extract('year', Invoice.paid_at) == year
        ).group_by(extract('hour', Invoice.paid_at)).all()
    elif month is not None:
        return db.session.query(func.extract('day', Invoice.paid_at).label('day'), \
                                func.sum(Invoice.amount).label('total_revenue') \
                                ).filter(
            extract('month', Invoice.paid_at) == month,
            extract('year', Invoice.paid_at) == year
        ).group_by(extract('day', Invoice.paid_at)).all()
    else:
        return db.session.query(func.extract('month', Invoice.paid_at).label('month'), \
                                func.sum(Invoice.amount).label('total_revenue') \
                                ).filter(
            extract('year', Invoice.paid_at) == year
        ).group_by(extract('month', Invoice.paid_at)).all()


def get_frequent_booking_room(month, quarter, year):
    query = db.session.query(Room.name, func.count(Room.id)) \
        .join(BookingDetail, Room.id.__eq__(BookingDetail.room_id)) \
        .join(Booking, BookingDetail.booking_id.__eq__(Booking.id)) \
        .join(Invoice, Booking.id.__eq__(Invoice.booking_id)) \
        .filter(Invoice.paid.__eq__(True))

    if month is not None:
        query = query.filter(func.month(Invoice.paid_at) == int(month))

    if quarter is not None:
        query = query.filter(func.quarter(Invoice.paid_at) == int(quarter))

    if year is not None:
        query = query.filter(func.year(Invoice.paid_at) == int(year))

    return query.group_by(Room.id).all()


if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        pass
        # print(get_revenue2(day=None, month=None, year=2024))
