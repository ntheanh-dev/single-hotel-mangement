from app.views.admin.base_model_view import BaseModelView


class FloorModelView(BaseModelView):
    column_labels = dict(
        id = "Mã",
        name="Tên",
    )
    column_searchable_list = ['name',]
