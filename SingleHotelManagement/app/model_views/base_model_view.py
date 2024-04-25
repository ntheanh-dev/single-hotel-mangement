from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from app.models.account import UserRole


# Lớp cơ sở dành cho những trang phía admin có thêm, sửa, xóa
class BaseModelView(ModelView):

    create_modal = True
    edit_modal = True
    details_modal = True

    column_display_pk = True
    page_size = 10
    can_view_details = True
    can_export = True

    def is_accessible(self):
        # return current_user.is_authenticated and current_user.role == UserRole.ADMIN
        return True
