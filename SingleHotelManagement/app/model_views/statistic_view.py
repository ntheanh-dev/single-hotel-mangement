from flask_admin import expose, BaseView
from app.utils.decorator import required_role
from app.models.account import UserRole
from app.services.utils import get_data_json_file


# Lớp tượng trưng cho trang chức năng thống kê phía admin
class StatisticView(BaseView):
    @expose('/')
    @required_role(UserRole.ADMIN)
    def index(self):
        selections = {
              "statistic_type": [
                  {
                    "type": "revenue",
                    "name": "Thống kê doanh thu"
                  },

                  {
                    "type": "frequently_tier_booking",
                    "name": "Thống kê doanh thu theo hạng"
                  }
              ],
              "statistic_condition": [
                {
                  "type": "month_statistic",
                  "name": "Thống kê theo tháng"
                },
                {
                  "type": "quarter_statistic",
                  "name": "Thống kê theo quý"
                },
                {
                  "type": "year_statistic",
                  "name": "Thống kê theo năm"
                },

                {
                  "type": "month_to_month_statistic",
                  "name": "Thống kê theo khoảng thời gian giữa 2 tháng"
                },

                {
                  "type": "quarter_to_quarter_statistic",
                  "name": "Thống kê theo khoảng thơì gian giữa 2 quý"
                },

                {
                  "type": "year_to_year_statistic",
                  "name": "Thống kê theo khoảng thời gian giữa 2 năm"
                }
              ],
              "chart_type": [
                {
                  "type": "pie",
                  "name": "Biểu đồ tròn"
                },

                {
                  "type": "line",
                  "name": "Biểu đồ đường"
                },

                {
                  "type": "bar",
                  "name": "Biểu đồ cột"
                },

                {
                  "type": "doughnut",
                  "name": "Biểu đồ doughnut"
                },

                {
                  "type": "polarArea",
                  "name": "Biểu đồ vùng cực"
                }
              ]
            }
        return self.render('/admin/statistic.html', selections=selections)

