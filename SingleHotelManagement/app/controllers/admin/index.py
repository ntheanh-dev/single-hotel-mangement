from app import app
from flask import render_template, request, jsonify


@app.route('/quan-tri/')
def admin():

    return render_template('/admin/index.html')
