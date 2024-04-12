import json
import os
from app import app


# Đọc dữ liệu từ file json
def get_data_json_file(filename):
    if filename:
        with open(os.path.join(app.root_path, 'data/{}'.format(filename)),
                  encoding='utf-8') as f:
            return json.load(f)
