# main.py
from flask import Flask, jsonify, request
from db import get, create

app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_songs():
    return get()


@app.route('/add', methods=['POST'])
def add_song():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    create(request.get_json())
    return 'Song Added'


if __name__ == '__main__':
    app.run()
