from app import init_tables, app,admin,init_admin,init_account
if __name__ == '__main__':
    with app.app_context():
        # init_tables()
        init_admin()
        app.run(debug=True)
