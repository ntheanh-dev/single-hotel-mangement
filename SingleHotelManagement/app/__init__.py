from flask import Flask
from urllib.parse import quote
from flask_sqlalchemy import SQLAlchemy

app = Flask("APH Hotel")

# Mysql config
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:%s@localhost/hoteldb?charset=utf8mb4' % quote('Admin@123')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.secret_key = '234jl23k4j234jlk@34987452ijodjdf'
db = SQLAlchemy(app=app)

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

from app.controllers.receptionist.home_controller import *


def init_tables():
    with app.app_context():
        try:
            db.drop_all()
            db.create_all()
        except Exception as e:
            print("An error occurred:", str(e))
            db.session.rollback()
