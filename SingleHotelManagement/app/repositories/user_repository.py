from app import db
from app.models.user import User
from app.models.account import Account
from app.models.booking import Booking


def get_user_by_id(user_id):
    return User.query.get(int(user_id))


def get_user_by_account_id(account_id):
    return db.session.query(User).join(Account,Account.user_id.__eq__(User.id)).filter(Account.id.__eq__(int(account_id))).first()


def get_user_by_booking_id(booking_id):
    return db.session.query(User).join(Booking,Booking.booker_id.__eq__(User.id)).filter(Booking.id.__eq__(int(booking_id))).first()