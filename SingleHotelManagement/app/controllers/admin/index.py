import json

from app import app
from flask import request, jsonify
from app.services.tier_service import get_tier_name
from app.services.statistict_service import get_statistic as gt


# @app.route('/admin/')
# def admin_home():
#     total_booking = count_booking()
#     total_guest = count_guest()
#     revenue = total_revenue()
#     status_values = request.args.getlist('trang-thai')
#     bookings = list_booking(status_values)
#     return render_template('/my_admin/index.html', total_booking=total_booking, total_guest=total_guest,
#                            revenue=revenue, bookings=bookings)


@app.route('/api/admin/tier-name/', methods=['post'])
def get_book_name_hint():
    kw = request.json.get('keyword')
    tier_names = []
    for tier in get_tier_name(kw=kw):
        tier_names.append({
            'tier_name': tier[0],
            'tier_id': tier[1]
        })
    return json.dumps(tier_names)


@app.route('/api/admin/statistic/', methods=['post'])
def get_statistic():
    data = json.loads(request.data)
    # import pdb
    # pdb.set_trace()
    result = gt(data=data)
    return jsonify(result)
#