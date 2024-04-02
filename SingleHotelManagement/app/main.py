from flask import render_template

from app import init_tables,app
from app.repositories.tier_repository import get_tier_has_available_room

# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        app.run(debug=True)
