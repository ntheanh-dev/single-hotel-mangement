from app.model_views.base_model_view import BaseModelView


class GuestModelView(BaseModelView):
    column_list = ['user_id', 'bookings']
