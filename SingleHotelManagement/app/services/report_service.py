from app.repositories.report_repository import get_revenue_with_date_detail as grwdd, get_frequent_booking_room as gfbr, \
    get_revenue as gr


def get_report_data_with_date_detail(report_type=None, month=None, quarter=None, year=None):
    if report_type == 'revenue':
        result = grwdd(month, quarter, year)
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


def get_revenue_data(day=None, month=None, year=None):
    if day is not None:
        day = int(day)
    if month is not None:
        month = int(month)
    if year is not None:
        year = int(year)
    result = gr(day=day, month=month, year=year)
    arr_dic = []
    for value in result:
        arr_dic.append({
            'paid_at': value[0],
            'revenue_total': float(value[1])
        })
    return arr_dic
