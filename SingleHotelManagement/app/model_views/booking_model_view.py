from app.model_views.base_model_view import BaseModelView


class BookingModelView(BaseModelView):
    column_list = ['id','start_date','end_date','checkin','checkout','status','note','receptionist','guest']
    column_labels = dict(
        id="Mã",
        start_date="Thời gian check in dự kiến",
        end_date="Thời gian check out dự kiến",
        checkin="Thời gian check int thực tế",
        checkout="Thời gian check out thực tế",
        status="Trạng thái",
        note="Ghi Chú",
        receptionist="Nhân Viên",
        guest="Khách đặt"
    )
    column_default_sort = 'start_date'
    column_filters = ['status']
