from datetime import datetime

from flask import url_for, redirect
from flask_login import current_user
from app.repositories.invoice_repository import get_invoice_by_booking_id, create_invoice, update_invoice, \
    destroy_invoice
from app.payment.vnpay import vnpay
from app.models.account import UserRole
from app.repositories.booking_detail_repository import get_total_price
from app import app
from app.repositories.payment_repository import is_paid as ip


def payment(booking_id=None, payment_method=None, current_booking_detail_id=None):
    if booking_id is None or payment_method is None:
        return '00'

    amount = get_total_price(booking_id)

    if payment_method == 'CASH':
        invoice = get_invoice_by_booking_id(booking_id)
        if invoice is None:
            create_invoice(booking_id, payment_method, amount)
        else:
            update_invoice(booking_id, paid=True, amount=amount)
        return '01'
    elif payment_method == 'VNPAY':
        try:
            # Tao hoa don de lay id lam vnp_TxnRef
            invoice = create_invoice(booking_id, payment_method, amount)
            vnp = vnpay()
            # Xây dựng các tham số cần thiết cho VNPay
            vnp.requestData['vnp_Version'] = '2.1.0'
            vnp.requestData['vnp_Command'] = 'pay'
            vnp.requestData['vnp_TmnCode'] = app.config.get('VNPAY_TMN_CODE')
            vnp.requestData['vnp_Amount'] = amount * 100
            vnp.requestData['vnp_CurrCode'] = 'VND'
            vnp.requestData['vnp_TxnRef'] = str(invoice.id) + "-" + datetime.now().strftime('%Y%m%d%H%M%S')
            vnp.requestData['vnp_OrderInfo'] = 'Thanh Toán Đơn Đặt Phòng'
            vnp.requestData['vnp_OrderType'] = 'billpayment'
            vnp.requestData['vnp_Locale'] = 'vn'
            vnp.requestData['vnp_BankCode'] = 'NCB'
            vnp.requestData['vnp_CreateDate'] = datetime.now().strftime('%Y%m%d%H%M%S')  # 20150410063022
            vnp.requestData['vnp_IpAddr'] = "127.0.0.1"
            if current_user.role == UserRole.RECEPTIONIST:
                vnp.requestData['vnp_ReturnUrl'] = url_for('receptionist_booking', ma=booking_id,
                                                           phong=current_booking_detail_id,
                                                           _external=True)  # Điều hướng sau khi thanh toán
            else:
                pass
            # Tạo URL thanh toán VNPay
            vnpay_payment_url = vnp.get_payment_url(app.config.get('VNPAY_PAYMENT_URL'),
                                                    app.config.get('VNPAY_HASH_SECRET_KEY'))

            return vnpay_payment_url
        except Exception as e:
            print(e)
            destroy_invoice(booking_id)
            return '00'
    else:
        # Chua hỗ trợ các phương thức thanh toán khác
        return '02'


def is_paid(booking_id):
    return ip(booking_id)
