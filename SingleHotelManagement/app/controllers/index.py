from flask import render_template, redirect, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user
from app.models.account import UserRole, Account
from app import app, login
from app.utils.decorator import logged
from app.services.account_service import user_login, receptionist_login, admin_login
from app.services.booking_service import retrieve_booking as rb, get_info_booking
from app.utils.decorator import required_role
from app.services.invoice_service import get_invoice_by_booking_id
from app.services.user_service import get_user_name_by_id
from app.models.invoice import PaymentMethod


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
    return render_template("/auth/login.html", err_msg="Tên đăng nhập hoặc mật khẩu không đúng!")


@app.route('/logout', methods=['get'])
def logout_my_user():
    logout_user()
    return redirect('/login')


@app.route('/api/booking/<booking_id>', methods=['GET'])
def retrieve_booking(booking_id):
    return jsonify(get_info_booking(booking_id))


@app.route("/bill/<booking_id>", methods=['get'])
@required_role(UserRole.RECEPTIONIST)
def print_bill(booking_id):
    booking_info = get_info_booking(int(booking_id))
    invoice = get_invoice_by_booking_id(booking_id)
    payment_method = "Tiền mặt" if invoice.payment_method == PaymentMethod.CASH else "VNPay"
    recep_name = get_user_name_by_id(booking_info['booking']['receptionist_id'])
    booker_name = get_user_name_by_id(booking_info['booking']['booker_id'])
    total = 0
    for b in booking_info['booking_details']:
        total += int(b['price'])
    return render_template("bill.html",
                           recep_name=recep_name, booker_name=booker_name, invoice=invoice,
                           booking=booking_info['booking'], booking_details=booking_info['booking_details'],
                           payment_method=payment_method, total=total)


# ------------Chỉ dùng cho mục đích demo--------------
@app.route("/api/switch/<role>", methods=['get'])
def switch_role(role):
    print("-------------------------")
    print(role)
    print("-------------------------")
    if role == 'guest':
        logout_user()
        return redirect(url_for("guest_home"))
    elif role == 'admin':
        logout_user()
        user = admin_login("admin", "12345")
        login_user(user)
        return redirect('/admin')
    elif role == 'receptionist':
        logout_user()
        user = receptionist_login("receptionist", "12345")
        login_user(user)
        return redirect(url_for("receptionist_home"))
