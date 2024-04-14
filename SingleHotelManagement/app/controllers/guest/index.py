from flask import render_template
from app import app


@app.route('/trang-chu/')
def guest_home():
    return render_template('/guest/index.html')
