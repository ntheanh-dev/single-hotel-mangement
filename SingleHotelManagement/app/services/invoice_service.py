from app.repositories.invoice_repository import total_revenue as tl, get_invoice_by_booking_id as gi


def total_revenue():
    return tl()


def get_invoice_by_booking_id(booking_id):
    return gi(booking_id)
