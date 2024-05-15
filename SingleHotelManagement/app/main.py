from app import app, init_admin
if __name__ == '__main__':
    with app.app_context():
        # init_tables()
        init_admin()
        app.run(debug=True)
