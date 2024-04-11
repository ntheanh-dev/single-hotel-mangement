from app.views.admin.base_model_view import BaseModelView


class TierModelView(BaseModelView):
    column_labels = dict(
        id='Mã',
        name='Tên',
        base_price = 'Giá gốc',
        max_guest = 'Số khách tối đa',
        normal_guest_count = 'Số khách khi tính giá gốc',
        extra_guest_surcharge = 'Phần trăm tính thêm khi vượt số khách quy định',
        foreign_guest_surcharge = 'Hệ số nhân có khách nước ngoài',
    )
