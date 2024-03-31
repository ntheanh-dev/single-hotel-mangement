from flask import render_template

from app import init_tables,app

# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    init_tables()
    app.run(debug=True)
