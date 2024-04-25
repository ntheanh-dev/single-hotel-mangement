from app.model_views.base_model_view import BaseModelView


class RoomModelView(BaseModelView):
    column_exclude_list = ['image']
    column_list = ['id','name','status','tier','floor']
    column_labels = dict(
        id="Mã",
        name="Tên phòng",
        status="Trạng thái",
        tier="Hạng",
        floor='Tầng'
    )
    column_searchable_list = ['name', 'status', ]
