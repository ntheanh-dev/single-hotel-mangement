from app.repositories.report_repository import get_revenue as gr, get_frequent_booking_room as gfbr


def get_report_data(report_type=None, month=None, quarter=None, year=None):
    if report_type == 'revenue':
        result = gr(month, quarter, year)
        arr_dic = []
        for value in result:
            arr_dic.append({
                'paid_at': value[0].strftime('%d/%m/%Y'),
                'revenue_total': float(value[1])
            })
        return arr_dic

    if report_type == 'frequently_tier_booking':
        result = gfbr(month, quarter, year)
        arr_dic = []

        for value in result:
            arr_dic.append({
                'room_name': value[0],
                'total_usage': value[1]
            })
            return arr_dic
    return []
