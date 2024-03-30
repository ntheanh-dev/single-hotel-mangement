from flask import Flask
from urllib.parse import quote
from flask_sqlalchemy import SQLAlchemy

app = Flask("APH Hotel")

# Mysql config
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:%s@localhost/hoteldb' % quote('Admin@123')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.secret_key = '234jl23k4j234jlk@34987452ijodjf'
db = SQLAlchemy(app)

from app.models.user import User
from app.models.role import Role

def init_tables():
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print("An error occurred:", str(e))
            db.session.rollback()



