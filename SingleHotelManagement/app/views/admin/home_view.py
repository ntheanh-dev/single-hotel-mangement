from flask_admin import AdminIndexView, expose

from flask import request
from app.services.booking_service import count_booking, list_booking
from app.services.guest_service import count_guest
from app.services.invoice_service import total_revenue


# Lớp tượng trưng cho trang home page
class HomeView(AdminIndexView):

    @expose('/')
    def index(self):
        total_booking = count_booking()
        total_guest = count_guest()
        revenue = total_revenue()
        status_values = request.args.getlist('trang-thai')
        bookings = list_booking(status_values, limit=10)
        return self.render('/admin/index.html', total_booking=total_booking, total_guest=total_guest, revenue=revenue,
                           bookings=bookings)
