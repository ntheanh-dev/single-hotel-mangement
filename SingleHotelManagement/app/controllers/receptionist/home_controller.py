from flask import render_template
from app import app


@app.route('/nhan-vien/lich-dat-phong/')
def home():
    return render_template('/receptionist/index.html')

@app.route('/nhan-vien/dat-phong/')
def booking():
    return render_template('/receptionist/booking.html')