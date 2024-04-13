from app.repositories.statistic_repository import get_revenue_by_month, get_revenue_by_quarter, get_revenue_by_year


def get_revenue(statistic_condition, from_time, to_time):
    if statistic_condition.__contains__('month'):
        return get_revenue_by_month(from_month=from_time, to_month=to_time)

    if statistic_condition.__contains__('quarter'):
        return get_revenue_by_quarter(from_quarter=from_time, to_quarter=to_time)

    if statistic_condition.__contains__('year'):
        return get_revenue_by_year(from_year=from_time, to_year=to_time)


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
                'revenue_total': '{:,.0f} VND'.format(float(r[1]))
            })

    if data['statistic_type'] == 'frequently_tier_booking':
        statistic_data = []

    return statistic_data
