import os
from flask import Flask, request, jsonify, session
import pymysql.cursors
from dotenv import find_dotenv, load_dotenv
import bcrypt
from functools import wraps
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', default=None)
CORS(app) 

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

CLOUD_SQL_USERNAME = os.getenv('CLOUD_SQL_USERNAME', default=None)
CLOUD_SQL_PASSWORD = os.getenv('CLOUD_SQL_PASSWORD', default=None)
CLOUD_SQL_DATABASE_NAME = os.getenv('CLOUD_SQL_DATABASE_NAME', default=None)
CLOUD_SQL_CONNECTION_NAME = os.getenv('CLOUD_SQL_CONNECTION_NAME', default=None)
CLOUD_SQL_PORT = int(os.getenv('CLOUD_SQL_PORT', default=None))


connection = pymysql.connect(
                        port=CLOUD_SQL_PORT,
                        host=CLOUD_SQL_CONNECTION_NAME, # endpoint
                        user=CLOUD_SQL_USERNAME,
                        password=CLOUD_SQL_PASSWORD,
                        db=CLOUD_SQL_DATABASE_NAME,
                        cursorclass=pymysql.cursors.DictCursor
                        )

cursor = connection.cursor()

@app.route("/")
def hello():
    return "Hello World!"

# login
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
    
        data = request.get_json()
        username = data['username']
        password = data['password']

        get_user = "SELECT _id, username, password FROM User WHERE username = %s"

        cursor.execute(get_user, (username,))
        user = cursor.fetchone()
        print(password.encode('utf-8'), user['password'].encode('utf-8'))
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            session['user_id'] = user['_id']
            session['authenticated'] = True
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401


# signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Check if the username or email already exists
        cursor.execute('SELECT * FROM User WHERE username = %s', (username))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "Username already exists!"}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cursor.execute('INSERT INTO User (username, password) VALUES (%s, %s)',
                       (username, hashed_password))
        connection.commit()
        return jsonify({"message": "User registered successfully!"}), 200

# logout
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user_id', None)
    session.pop('authenticated')
    return jsonify({"message": "Logout successful!"}), 200

# login required
def loginRequired(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not session.get('authenticated'):
            return jsonify({"message": "Unauthorized!"}), 401
        return func(*args, **kwargs)
    return decorated_function

# get users 
@app.route('/users', methods=['GET'])
@loginRequired
def getUsers():
    cursor.execute('SELECT * FROM User')
    return cursor.fetchall()

# create deck
@app.route('/deck', methods=['POST'])
@loginRequired
def createDeck():
    try:
        data = request.get_json()

        if not data['name']:
            return jsonify({"message": "Deckname is required"}), 400
        name = data['name']
        user = session['user_id']
        cards = data['cards']

        cursor.execute('INSERT INTO Decks (name, user) VALUES (%s, %s)',
                        (name, user))
        connection.commit()
        deck_id = cursor.lastrowid

        createCards(cards, deck_id)

        return jsonify({"message": "Deck created successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Failed to create deck", "error": str(e)}), 500

def createCards(cards, deck):
    try:
        for card in cards:
            prompt = card['prompt']
            answer = card['answer']

            cursor.execute('INSERT INTO Cards (deck, prompt, answer) VALUES (%s, %s, %s)',
                        (deck, prompt, answer))
            connection.commit()

    except Exception as e:
        return jsonify({"message": "Failed to create deck", "error": str(e)}), 500

# update deck
@app.route('/deck', methods=['PATCH'])
@loginRequired
def updateDeck():
    try:
        data = request.get_json()

        if not data['name']:
            return jsonify({"message": "Deckname is required"}), 400
        deck_id = data['deck_id']
        name = data['name']
        user = session['user_id']


        cursor.execute('UPDATE Decks SET name = %s WHERE deck_id = %s AND user = %s',
                        (name, deck_id, user))
        connection.commit()

        return jsonify({"message": "Deck updated successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Failed to update deck", "error": str(e)}), 500

# delete deck
@app.route('/deck', methods=['DELETE'])
@loginRequired
def deleteDeck():
    try:
        data = request.get_json()

        deck_id = data['deck_id']
        user = session['user_id']

        cursor.execute('DELETE FROM Decks WHERE deck_id = %s AND user = %s',
                        (deck_id, user))
        connection.commit()

        return jsonify({"message": "Deck updated successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Failed to delete deck", "error": str(e)}), 500

