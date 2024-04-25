from app.model_views.base_model_view import BaseModelView


class TierModelView(BaseModelView):
    column_list = ['id', 'name', 'base_price', 'max_guest', 'normal_guest_count', 'extra_guest_surcharge',
                            'foreign_guest_surcharge']
    column_labels = dict(
        id='Mã',
        name='Tên',
        base_price='Giá gốc',
        max_guest='Số khách tối đa',
        normal_guest_count='Số khách khi tính giá gốc',
        extra_guest_surcharge='Phần trăm tính thêm khi vượt số khách quy định',
        foreign_guest_surcharge='Hệ số nhân có khách nước ngoài'
    )
