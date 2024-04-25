from app.model_views.base_model_view import BaseModelView


class FloorModelView(BaseModelView):
    column_list = ['id','name']
    column_labels = dict(
        id = "Mã",
        name="Tên",
    )
    column_searchable_list = ['name',]
