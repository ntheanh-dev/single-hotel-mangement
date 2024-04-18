from flask import render_template, redirect, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user
from app.models.account import UserRole, Account
from app import app, login
from app.utils.decorator import logged
from app.services.account_service import user_login, receptionist_login, admin_login
from app.services.booking_service import retrieve_booking as rb,get_info_booking


@login.user_loader
def load_user(id):
    return Account.query.get(int(id))


@app.route("/")
def index():
    if current_user.is_authenticated:
        if current_user.role == UserRole.ADMIN:
            return redirect('/admin')
        if current_user.role == UserRole.RECEPTIONIST:
            return redirect(url_for("receptionist_home"))

    return redirect(url_for("guest_home"))


@app.route("/login", methods=['get', 'post'])
@logged
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    if request.method.__eq__('POST'):
        username = request.form.get('username')
        password = request.form.get('password')
        login_role = request.form.get('login_role')
        if login_role.__eq__('receptionist'):
            user = receptionist_login(username, password)
            if user:
                login_user(user)
                return redirect(url_for("receptionist_home"))
        elif login_role.__eq__('admin'):
            user = admin_login(username, password)
            if user:
                login_user(user)
                return redirect('/admin')
        else:
            user = user_login(username, password)
            if user:
                login_user(user)
                return redirect(url_for("guest_home"))

    return render_template("login.html")


@app.route('/logout', methods=['get'])
def logout_my_user():
    logout_user()
    return redirect('/login')


@app.route('/api/booking/<booking_id>', methods=['GET'])
def retrieve_booking(booking_id):
    return jsonify(get_info_booking(booking_id))
