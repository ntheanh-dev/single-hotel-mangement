from sqlalchemy import func

from app import db
from app.models.invoice import Invoice


def total_revenue():
    return db.session.query(func.sum(Invoice.amount)).scalar()