from app.repositories.invoice_repository import get_invoice_by_booking_id, create_invoice, update_invoice


def payment(booking_id=None, payment_method=None, amount=None):
    if booking_id is None or payment_method is None or amount is None:
        return '00'
    else:
        if payment_method == 'CASH':
            invoice = get_invoice_by_booking_id(booking_id)
            if invoice is None:
                create_invoice(booking_id, payment_method, amount)

            else:
                update_invoice(booking_id, paid=True, amount=amount)
            return '01'
        else:
            # Chua hỗ trợ các phương thức thanh toán khác
            return '02'
