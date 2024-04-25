from app.model_views.base_model_view import BaseModelView


class UserModelView(BaseModelView):
    column_searchable_list = ['first_name','last_name','phone_number','address','district','city']
    column_labels = dict(id='Mã',
                         first_name='Tên',
                         last_name='Họ và tên đệm',
                         phone_number='Số điện thoại',
                         gmail='Gmail',
                         city='Thành phố',
                         district='Quận/Huyện',
                         address='Địa chỉ',
                         birthdate='Ngày sinh',
                         foreigner='Khách nước ngoài',)
    column_filters = ['foreigner','city','district']