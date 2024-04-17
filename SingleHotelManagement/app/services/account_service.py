from app.repositories.account_repository import auth_user
from app.models.account import UserRole


def user_login(username, password):
    return auth_user(username=username, password=password, role=UserRole.GUEST)


def receptionist_login(username, password):
    return auth_user(username=username, password=password, role=UserRole.RECEPTIONIST)


def admin_login(username, password):
    return auth_user(username=username, password=password, role=UserRole.ADMIN)
