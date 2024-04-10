from app import db
from sqlalchemy import or_, and_
from app.models.guest import Guest
from app.models.user import User


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
                )

    db.session.add(user)
    db.session.commit()

    guest = Guest(user_id=user.id)
    db.session.add(guest)
    db.session.commit()
    return user


def count_guest():
    return db.session.query(Guest).count()


def search_guest_by_phone_number(phone_number=None, foreigner=None, **kwargs):
    if foreigner:
        return db.session.query(User).filter(User.phone_number.__eq__(phone_number),
                                             User.foreigner.__eq__(foreigner)).all()
    else:
        return db.session.query(User).filter(User.phone_number.__eq__(phone_number)).all()


def search_guest_by_name(name=None, foreigner=None, **kwargs):
    if foreigner:
        return db.session.query(User).filter(or_(and_(User.first_name.contains(name), User.foreigner.__eq__(foreigner)),
                                                 and_(User.last_name.contains(name),
                                                      User.foreigner.__eq__(foreigner))), ).all()
    else:
        return db.session.query(User).filter(or_(User.first_name.contains(name), User.last_name.contains(name))).all()


def search_guest_by_address(address=None, foreigner=None, **kwargs):
    if foreigner:
        return db.session.query(User).filter(
            or_(User.address.contains(address), User.district.contains(address), User.city.contains(address)),
            User.foreigner.__eq__(foreigner)).all()
    else:
        return db.session.query(User).filter(
            or_(User.address.contains(address), User.district.contains(address), User.city.contains(address))).all()
