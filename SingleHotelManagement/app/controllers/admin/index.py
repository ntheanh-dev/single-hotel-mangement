import json
from app import app
from flask import request, jsonify
from app.services.tier_service import get_tier_name
from app.services.statistict_service import get_statistic
from app.services.report_service import get_report_data_with_date_detail as grd, get_revenue_data as gr
from app.utils.decorator import required_role
from app.models.account import UserRole


# --------------Lay thong tin hạng phòng theo keyword--------------
@app.route('/api/admin/tier-name/', methods=['post'])
@required_role(UserRole.ADMIN)
def get_tier_name_hint():
    kw = request.json.get('keyword')
    tier_names = []
    for tier in get_tier_name(kw=kw):
        tier_names.append({
            'tier_name': tier[0],
            'tier_id': tier[1]
        })
    return json.dumps(tier_names)


# -----------------Lấy dữ liệu thống kê theo nhieu dieu kien--------------
@app.route('/api/admin/statistic/', methods=['post'])
@required_role(UserRole.ADMIN)
def get_statistic_data():
    data = json.loads(request.data)
    result = get_statistic(data=data)
    return jsonify(result)


# ----------------Lấy dữ liệu báo cáo--------------------
@app.route('/api/admin/report/', methods=['post'])
@required_role(UserRole.ADMIN)
def get_report_data():
    report_type = request.json.get('report_type')
    month = request.json.get('month')
    quarter = request.json.get('quarter')
    year = request.json.get('year')
    return jsonify(grd(report_type=report_type,
                       month=month,
                       quarter=quarter,
                       year=year))


# --------------------Lấy tong doanh thu-------------------
@app.route('/api/admin/revenue/', methods=['post'])
@required_role(UserRole.ADMIN)
def get_revenue_data():
    day = request.json.get('day')
    month = request.json.get('month')
    year = request.json.get('year')
    return jsonify(gr(day=day, month=month, year=year))
