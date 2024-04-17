from functools import wraps
from flask import request, redirect, url_for, session
from flask_login import current_user


def logged(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated:
            return redirect(url_for('index', next=request.url))

        return f(*args, **kwargs)

    return decorated_function


def required_role(role):
    def wrap(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user.is_authenticated and current_user.role == role:
                return f(*args, **kwargs)
            return redirect(url_for('index', next=request.url))

        return decorated_function

    return wrap
