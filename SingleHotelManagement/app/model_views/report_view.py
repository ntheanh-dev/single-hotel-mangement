from flask_admin import expose, BaseView

from app.services.utils import get_data_json_file
from app.utils.decorator import required_role
from app.models.account import UserRole


# Lớp tượng trưng cho trang chức năng thống kê phía admin
class ReportView(BaseView):
    @expose('/')
    @required_role(UserRole.ADMIN)
    def index(self):
        selections = get_data_json_file('report_fields.json')
        return self.render('/admin/report.html', selections=selections)
