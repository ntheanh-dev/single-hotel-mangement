from app.models.account import Account
from app import app, db
import hashlib


def auth_user(username, password, role):
    password = str(hashlib.md5(password.strip().encode('utf-8')).hexdigest())
    return db.session.query(Account).filter(Account.username.__eq__(username.strip()), Account.password.__eq__(password),Account.role.__eq__(role)).first()
