from app import app
from flask import render_template, request, jsonify
from app.services.booking_service import count_booking, list_booking
from app.services.guest_service import count_guest
from app.services.invoice_service import total_revenue


# @app.route('/admin/')
# def admin_home():
#     total_booking = count_booking()
#     total_guest = count_guest()
#     revenue = total_revenue()
#     status_values = request.args.getlist('trang-thai')
#     bookings = list_booking(status_values)
#     return render_template('/my_admin/index.html', total_booking=total_booking, total_guest=total_guest,
#                            revenue=revenue, bookings=bookings)


@app.route('/api/admin/count-guest/', methods=['get'])
def admin_home_get_total_guest():
    return jsonify(count_guest())


@app.route('/api/admin/count-booking/', methods=['get'])
def admin_home_get_total_booking():
    return jsonify(count_booking())


@app.route('/api/admin/revenue/', methods=['get'])
def admin_home_get_revenue():
    return jsonify(total_revenue())


@app.route('/api/admin/booking/', methods=['get'])
def admin_home_get_booking():
    return list_booking()
