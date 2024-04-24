from app.repositories.user_repository import get_user_by_id as gu


def get_user_name_by_id(id):
    return gu(id).get_full_name();
