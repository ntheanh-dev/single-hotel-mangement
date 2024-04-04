from app import db

from app.models.guest import Guest
from app.models.user import User, UserRole


def is_phone_number_exist(phone_number=None):
    user = User.query.filter(User.phone_number == phone_number).first()
    if user:
        return True
    return False


def register_guest(data=None, **kwargs):
    user = User(first_name=data['first_name'],
                last_name=data['last_name'],
                phone_number=data['phone_number'],
                city=data['city'],
                district=data['district'],
                address=data['address'],
                birthdate=data['birthdate'],
                foreigner=data['foreigner'],
                role=UserRole.GUEST)

    db.session.add(user)
    db.session.commit()

    guest = Guest(user_id=user.id)
    db.session.add(guest)
    db.session.commit()
