import os
from flask import Flask, request, jsonify
import pymysql.cursors
from dotenv import find_dotenv, load_dotenv
import bcrypt

app = Flask(__name__)


dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

CLOUD_SQL_USERNAME = os.getenv('CLOUD_SQL_USERNAME', default=None)
CLOUD_SQL_PASSWORD = os.getenv('CLOUD_SQL_PASSWORD', default=None)
CLOUD_SQL_DATABASE_NAME = os.getenv('CLOUD_SQL_DATABASE_NAME', default=None)
CLOUD_SQL_CONNECTION_NAME = os.getenv('CLOUD_SQL_CONNECTION_NAME', default=None)
CLOUD_SQL_PORT = int(os.getenv('CLOUD_SQL_PORT', default=None))


conn = pymysql.connect(
                        port=CLOUD_SQL_PORT,
                        host=CLOUD_SQL_CONNECTION_NAME, # endpoint
                        user=CLOUD_SQL_USERNAME,
                        password=CLOUD_SQL_PASSWORD,
                        db=CLOUD_SQL_DATABASE_NAME,
                        cursorclass=pymysql.cursors.DictCursor
                        )



@app.route("/")
def hello():
    return "Hello."

# login
@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return jsonify({"message": "User logged in successfully"})


# callback
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    data = request.get_json()
    
    return jsonify({"message": "User registered successfully"})

# logout