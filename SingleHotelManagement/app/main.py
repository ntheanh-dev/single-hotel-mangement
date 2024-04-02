from app import init_tables, app

if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        app.run(debug=True)
