from app import init_tables, app,admin,init_admin
if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        init_admin()
        app.run(debug=True)
