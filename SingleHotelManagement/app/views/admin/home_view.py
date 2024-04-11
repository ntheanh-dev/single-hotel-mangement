from flask_admin import AdminIndexView, expose


# Lớp tượng trưng cho trang home page
class HomeView(AdminIndexView):

    @expose('/')
    def index(self):
        return self.render('/admin/index.html')
