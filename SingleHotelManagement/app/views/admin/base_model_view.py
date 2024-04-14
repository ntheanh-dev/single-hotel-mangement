from flask import session
from flask_admin import BaseView
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from app.models.account import UserRole


class AuthenticatedAdmin(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.role == UserRole.ADMIN


# Lớp cơ sở dành cho những trang phía admin có thêm, sửa, xóa
class BaseModelView(AuthenticatedAdmin):
    can_create = True
    can_edit = True
    can_delete = True
    create_modal = True
    edit_modal = True
    details_modal = True
    column_display_pk = True
    page_size = 10
    column_display_all_relations = True
    can_view_details = True
    can_export = True
