from flask import Flask
from urllib.parse import quote
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView


app = Flask("APH Hotel")

# Mysql config
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:%s@localhost/hoteldb?charset=utf8mb4' % quote('Admin@123')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.secret_key = '234jl23k4j234jlk@34987452ijodjdf'
db = SQLAlchemy(app=app)

from app.views.admin.home_view import HomeView

# Flask Admin
my_admin = Admin(app=app, name='Quan Ly Khach San', template_mode='bootstrap4',index_view=HomeView(name="Trang Chu"))

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
from app.models.booking import Booking
from app.models.booking_detail import BookingDetail
from app.models.room import Room
from app.models.tier import Tier
from app.models.floor import Floor

from app.views.admin.guest_model_view import GuestModelView
from app.views.admin.booking_model_view import BookingModelView
from app.views.admin.booking_detail_model_view import BookingDetailModelView
from app.views.admin.room_model_view import RoomModelView
from app.views.admin.tier_model_view import TierModelView
from app.views.admin.floor_model_view import FloorModelView

from app.controllers.receptionist.home_controller import *
from app.controllers.admin.index import *


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
    my_admin.add_view(GuestModelView(User, db.session,name='nguoi dung'))
    my_admin.add_view(BookingModelView(Booking, db.session,name='booking'))
    my_admin.add_view(BookingDetailModelView(BookingDetail, db.session,name='booking-detail'))
    my_admin.add_view(RoomModelView(Room, db.session,name='phong'))
    my_admin.add_view(TierModelView(Tier, db.session,name='hang phong'))
    my_admin.add_view(FloorModelView(Floor, db.session,name='tầng'))
