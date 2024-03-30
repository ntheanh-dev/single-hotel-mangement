from app import init_tables, app

if __name__ == '__main__':
    init_tables()
    app.run(debug=True)
