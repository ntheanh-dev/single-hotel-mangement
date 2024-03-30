from flask import render_template

from app import app


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':
    with app.app_context():
        app.run(debug=True)
