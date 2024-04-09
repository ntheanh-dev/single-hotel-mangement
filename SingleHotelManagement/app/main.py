from app import init_tables, app
from app.services.booking_service import get_info_booking
if __name__ == '__main__':
    # init_tables()
    with app.app_context():
        print(get_info_booking(4))
        app.run(debug=True)
