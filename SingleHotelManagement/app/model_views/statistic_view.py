from flask_admin import expose, BaseView

from app.services.utils import get_data_json_file


# Lớp tượng trưng cho trang chức năng thống kê phía admin
class StatisticView(BaseView):
    @expose('/')
    def index(self):
        selections = get_data_json_file('statistic_fields.json')
        return self.render('/admin/statistic.html', selections=selections)

