from flask_mail import Message
from app import mail
from flask import render_template


def send_mail(receiver_name, receiver_email):
    msg_title = "Chúc mừng bạn đã đặt phòng thành công bên chúng tôi."
    sender = "theanhmgt66@gmail.com"
    msg = Message(msg_title, sender=sender, recipients=[receiver_email, ])
    data = {
        "name": receiver_name
    }
    msg.html = render_template("/email/index.html", data=data)
    try:
        mail.send(msg)
    except Exception as e:
        print("-----------")
        print(e)
        print("-----------")
