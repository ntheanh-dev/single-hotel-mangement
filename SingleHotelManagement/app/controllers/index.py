from flask import render_template, redirect, url_for
from flask_login import current_user
from app.models.account import UserRole, Account
from app import app, login


@login.user_loader
def load_user(id):
    return Account.query.get(int(id))


@app.route("/")
def index():
    if current_user.is_authenticated:
        if current_user.role == UserRole.ADMIN:
            return redirect('/admin')
        if current_user.role == UserRole.ADMIN:
            return redirect(url_for("receptionist_home"))

    return redirect(url_for("guest_home"))


@app.route("/login", methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))

    return render_template("/admin/login.html")
