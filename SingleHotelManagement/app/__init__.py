import hashlib

from flask import Flask
from urllib.parse import quote
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_login import LoginManager

app = Flask("APH Hotel")

# Mysql config
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:%s@localhost/hoteldb?charset=utf8mb4' % quote('Admin@123')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.secret_key = '234jl23k4j234jlk@34987452ijodjdf'
# VNPay config

app.config["VNPAY_TMN_CODE"] = 'Q2L9DE6D'
app.config["VNPAY_HASH_SECRET_KEY"] = 'IDKCETNVMRJOMDYZCCEEFMSJJLTRQRKX'
app.config["VNPAY_PAYMENT_URL"] = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
app.config["VNPAY_RETURN_URL"] = 'http://192.168.1.207:8000/vnpay/payment_return/'


db = SQLAlchemy(app=app)
login = LoginManager(app)

from app.model_views.home_view import HomeView

# Flask Admin
my_admin = Admin(app=app, name='Quan Ly Khach San', template_mode='bootstrap4', index_view=HomeView(name="Trang Chu"))

from app.models import user
from app.models import account
from app.models import admin
from app.models import booking
from app.models import booking_detail
from app.models import room
from app.models import floor
from app.models import guest
from app.models import image
from app.models import invoice
from app.models import notification
from app.models import receptionist
from app.models import tier

from app.models.user import User
from app.models.receptionist import Receptionist
from app.models.admin import Admin
from app.models.booking import Booking
from app.models.booking_detail import BookingDetail
from app.models.room import Room
from app.models.tier import Tier
from app.models.floor import Floor
from app.models.account import Account, UserRole

from app.model_views.guest_model_view import GuestModelView
from app.model_views.booking_model_view import BookingModelView
from app.model_views.booking_detail_model_view import BookingDetailModelView
from app.model_views.room_model_view import RoomModelView
from app.model_views.tier_model_view import TierModelView
from app.model_views.floor_model_view import FloorModelView
from app.model_views.statistic_view import StatisticView
from app.model_views.report_view import ReportView

from app.controllers.guest.index import *
from app.controllers.receptionist.index import *
from app.controllers.admin.index import *
from app.controllers.index import *


def init_tables():
    with app.app_context():
        try:
            db.drop_all()
            db.create_all()
        except Exception as e:
            print("An error occurred:", str(e))
            db.session.rollback()


# Tạo view phía my_admin
def init_admin():
    my_admin.add_view(GuestModelView(User, db.session, name='nguoi dung'))
    my_admin.add_view(BookingModelView(Booking, db.session, name='booking'))
    my_admin.add_view(BookingDetailModelView(BookingDetail, db.session, name='booking-detail'))
    my_admin.add_view(RoomModelView(Room, db.session, name='phong'))
    my_admin.add_view(TierModelView(Tier, db.session, name='hang phong'))
    my_admin.add_view(FloorModelView(Floor, db.session, name='tầng'))

    my_admin.add_view(StatisticView(name='Thống kê', url='statistic'))
    my_admin.add_view(ReportView(name='Báo cáo', url='report'))


def init_account():
    with app.app_context():
        try:
            # ---------------------- Tai Khoan Admin----------------
            # u = User(phone_number='0384958374', first_name='Anh', last_name='Nguyen')
            # db.session.add(u)
            # db.session.commit()
            # admin = Admin(user_id=u.id)
            # account = Account(username='admin', password=str(hashlib.md5("12345".encode('utf-8')).hexdigest()),
            #                   role=UserRole.ADMIN,
            #                   gmail='abc@gmail.com', user_id=u.id)
            # db.session.add(admin)
            # db.session.add(account)
            # --------------------Tai khoan le tan ------------------
            u2 = User(phone_number='0384958371', first_name='Duc', last_name='Tran')
            db.session.add(u2)
            db.session.commit()
            receptionist = Receptionist(user_id=u2.id)
            account2 = Account(username='receptionist', password=str(hashlib.md5("12345".encode('utf-8')).hexdigest()),
                               role=UserRole.RECEPTIONIST,
                               gmail='abc@gmail.com', user_id=u2.id)
            db.session.add(receptionist)
            db.session.add(account2)
            db.session.commit()
        except Exception as e:
            print(e)
            db.session.rollback()
