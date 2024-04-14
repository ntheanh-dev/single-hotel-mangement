from app import init_tables, app,admin,init_admin,init_account
if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        init_admin()
        # init_account()
        app.run(debug=True)
