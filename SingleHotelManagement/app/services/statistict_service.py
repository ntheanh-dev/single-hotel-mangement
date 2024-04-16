from app.repositories.statistic_repository import get_revenue_by_month, get_revenue_by_quarter, get_revenue_by_year,\
    get_frequent_booking_tier_month,get_frequent_booking_tier_quarter,get_frequent_booking_tier_year
from datetime import datetime


def get_revenue(statistic_condition, from_time, to_time):
    if statistic_condition.__contains__('month'):
        return get_revenue_by_month(from_month=from_time, to_month=to_time)

    if statistic_condition.__contains__('quarter'):
        return get_revenue_by_quarter(from_quarter=from_time, to_quarter=to_time)

    if statistic_condition.__contains__('year'):
        return get_revenue_by_year(from_year=from_time, to_year=to_time)


def get_frequent_booking_tier(statistic_condition, from_time, to_time,tier_id):
    if statistic_condition.__contains__('month'):
        return get_frequent_booking_tier_month(from_month=from_time, to_month=to_time,tier_id=tier_id)

    if statistic_condition.__contains__('quarter'):
        return get_frequent_booking_tier_quarter(from_quarter=from_time, to_quarter=to_time,tier_id=tier_id)

    if statistic_condition.__contains__('year'):
        return get_frequent_booking_tier_year(from_year=from_time, to_year=to_time,tier_id=tier_id)


def get_statistic(data=None):
    if data is None:
        return []

    statistic_condition = data['statistic_condition']
    from_time = data['from_time']
    to_time = data['to_time']

    statistic_data = []
    if data['statistic_type'] == 'revenue':
        result = get_revenue(statistic_condition, from_time, to_time)
        for r in result:
            statistic_data.append({
                'time':r[0],
                'revenue_total': float(r[1])
            })

    if data['statistic_type'] == 'frequently_tier_booking':
        tier_id = data['tier_id']
        result = get_frequent_booking_tier(statistic_condition,from_time,to_time,tier_id)
        for r in result:
            statistic_data.append({
                'time':r[0],
                'total': r[1]
            })
    return statistic_data


