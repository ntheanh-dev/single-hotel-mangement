from datetime import datetime
from sqlalchemy import func

from app import db
from app.models.invoice import Invoice, PaymentMethod


def total_revenue():
    return db.session.query(func.sum(Invoice.amount)).scalar()


def get_invoice_by_booking_id(booking_id):
    return db.session.query(Invoice).filter(Invoice.booking_id.__eq__(int(booking_id))).first()


def create_invoice(booking_id, payment_method, amount):
    invoice = Invoice(amount=int(amount), paid=True, paid_at=datetime.now(),
                      payment_method=PaymentMethod(payment_method), booking_id=int(booking_id))
    db.session.add(invoice)
    db.session.commit()


def update_invoice(booking_id, **kwargs):
    paid = kwargs.get('paid')
    amount = kwargs.get('amount')

    invoice = get_invoice_by_booking_id(int(booking_id))
    invoice.paid = paid
    invoice.amount = int(amount)

    db.session.commit()
