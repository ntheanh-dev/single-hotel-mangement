from flask_admin import expose, BaseView

from app.services.utils import get_data_json_file
from app.utils.decorator import required_role
from app.models.account import UserRole


# Lớp tượng trưng cho trang chức năng thống kê phía admin
class ReportView(BaseView):
    @expose('/')
    @required_role(UserRole.ADMIN)
    def index(self):
        selections = {
              "report_type": [
                  {
                    "type": "revenue",
                    "name": "Thống kê doanh thu"
                  },

                  {
                    "type": "frequently_tier_booking",
                    "name": "Thống kê tần suất sử dụng phòng"
                  }
              ],
              "report_condition": [
                {
                  "type": "month_report",
                  "name": "Báo cáo theo tháng"
                },
                {
                  "type": "quarter_report",
                  "name": "Báo cáo theo quý"
                },
                {
                  "type": "year_report",
                  "name": "Báo cáo theo năm"
                }
              ]
            }
        return self.render('/admin/report.html', selections=selections)
