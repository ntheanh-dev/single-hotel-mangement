from flask_admin.contrib.sqla import ModelView
from flask_login import current_user


# Lớp cơ sở dành cho những trang phía admin có thêm, sửa, xóa
class BaseModelView(ModelView):
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

