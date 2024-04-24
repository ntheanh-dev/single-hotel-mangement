from sqlalchemy import desc

from app import db
from app.models.notification import Notification


def create(user_id, content):
    notif = Notification(user_id=user_id, content=content)
    db.session.add(notif)
    db.session.commit()


def list_notif():
    return db.session.query(Notification).order_by(desc(Notification.created_date)).limit(15)
