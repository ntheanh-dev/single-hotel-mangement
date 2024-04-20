from app.repositories.user_repository import get_user_by_id, get_user_by_booking_id, get_user_by_account_id
from app.repositories.notification_repository import create, list_notif as ln


class CreateNotif():
    @staticmethod
    def booking_online(user_id):
        u = get_user_by_id(user_id)
        content = "Một khách lẻ vừa đặt phòng trực tuyến"
        if u is not None:
            content = "{0} vừa đặt phòng trực tuyến".format(u.get_full_name())

        create(user_id=user_id, content=content)

    @staticmethod
    def booking_offline(user_id):
        u = get_user_by_id(user_id)
        content = "Một khách lẻ vừa đặt phòng trực tiếp"
        if u is not None:
            content = "{0} vừa đặt phòng trực tiếp".format(u.get_full_name())

        create(user_id=user_id, content=content)

    @staticmethod
    def checkin(user_id):
        u = get_user_by_id(user_id)
        content = "Một khách lẻ vừa checkin thành công"
        if u is not None:
            content = "{0} vừa checkin thành công".format(u.get_full_name())

        create(user_id=user_id, content=content)

    @staticmethod
    def checkout(user_id):
        u = get_user_by_id(user_id)
        content = "Một khách lẻ vừa trả phòng thành công"
        if u is not None:
            content = "{0} vừa trả phòng thành công".format(u.get_full_name())

        create(user_id=user_id, content=content)

    @staticmethod
    def checkout(booking_id):
        u = get_user_by_booking_id(booking_id)

        content = "{0} vừa trả phòng thành công".format(u.get_full_name())

        create(user_id=u.id, content=content)

    @staticmethod
    def payment(booking_id):
        u = get_user_by_booking_id(booking_id)
        print(booking_id)
        content = "{0} vừa thanh toán thanh công đơn đặt phòng mã {1}".format(u.get_full_name(), booking_id)

        create(user_id=u.id, content=content)

    @staticmethod
    def cancel_booking(account_id, booking_id):
        content = 'Đơn đặt phòng có mã {0} vừa bị huỷ'.format(booking_id)
        u = get_user_by_account_id(account_id)
        print(account_id)
        create(user_id=u.id, content=content)


def list_notif():
    return ln()
