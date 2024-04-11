from app.views.admin.base_model_view import BaseModelView


class BookingModelView(BaseModelView):
    column_labels = dict(
        id="Mã",
        start_date="Thời gian check in dự kiến",
        end_date="Thời gian check out dự kiến",
        checkin="Thời gian check int thực tế",
        checkout="Thời gian check out thực tế",
        status="Trạng thái",
        note="Ghi Chú",
    )
    column_default_sort = 'start_date'
    column_filters = ['status']
