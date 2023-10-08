import os
from flask import Flask, request, jsonify, session
import pymysql.cursors
from dotenv import find_dotenv, load_dotenv
import bcrypt
# from functools import wraps
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', default=None)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

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

JWT_SECRET = os.getenv("JWT_SECRET", default=None)
jwt = JWTManager(app)

revoked_tokens = set()

def is_token_revoked(decoded_token):
    jti = decoded_token['jti']
    return jti in revoked_tokens

@app.route("/")
def hello():
    return "Hello World!"

def create_token(id):
    access_token = create_access_token(identity=id)
    return access_token
    
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
        print(user)
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            access_token = create_token(user['_id'])
            return jsonify({"message": "Login successful.", "token": access_token}), 200
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
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    revoked_tokens.add(current_user)
    return jsonify({"message": "Logout successful!"}), 200

# get users 
@app.route('/users', methods=['GET'])
@jwt_required()
def getUsers():
    cursor.execute('SELECT * FROM User')
    return cursor.fetchall()

# create deck
@app.route('/deck', methods=['POST'])
@jwt_required()
def createDeck():
    try:
        data = request.get_json()

        if not data['name']:
            return jsonify({"message": "Deckname is required"}), 400
        name = data['name']
        user = get_jwt_identity()
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
@jwt_required()
def updateDeck():
    try:
        data = request.get_json()

        if not data['name']:
            return jsonify({"message": "Deckname is required"}), 400
        deck_id = data['deck_id']
        name = data['name']
        user = get_jwt_identity()


        cursor.execute('UPDATE Decks SET name = %s WHERE deck_id = %s AND user = %s',
                        (name, deck_id, user))
        connection.commit()

        return jsonify({"message": "Deck updated successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Failed to update deck", "error": str(e)}), 500

# delete deck
@app.route('/deck', methods=['DELETE'])
@jwt_required()
def deleteDeck():
    try:
        data = request.get_json()

        deck_id = data['deck_id']
        user = get_jwt_identity()

        # Assuming deck_id is the ID of the deck you want to delete
        cursor.execute('DELETE FROM Cards WHERE deck = %s', (deck_id,))
        connection.commit()

        cursor.execute('DELETE FROM Decks WHERE deck_id = %s AND user = %s',
                        (deck_id, user))
        connection.commit()

        return jsonify({"message": "Deck deleted successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Failed to delete deck", "error": str(e)}), 500
    
# get decks
@app.route('/decks', methods=['GET'])
@jwt_required()
def getDecks():
    try:
        user = get_jwt_identity()
        print(user)
        decks = getDecksFromUser(user)
        return jsonify(decks)
    except Exception as e:
        return jsonify({"message": "Failed to get decks", "error": str(e)}), 500
    
# get cards from deck
@app.route('/cards', methods=['GET'])
@jwt_required()
def getCards():
    try:
        deck = request.args.get('deck')

        decks = getCardsFromDeck(deck)

        return jsonify(decks)
    except Exception as e:
        return jsonify({"message": "Failed to get decks", "error": str(e)}), 500
    
@app.route('/file', methods=['POST'])
@jwt_required()
def uploadFilethingy():
    return
    
def getDecksFromUser(user_id: int):
    cursor.execute("""
        SELECT Decks.name, Decks.deck_id
        FROM User
        INNER JOIN Decks
        ON User._id = Decks.user
        WHERE User._id = %s;
    """, user_id)
    return cursor.fetchall()

def getCardsFromDeck(deck_id: int, user_id: int):
    cursor.execute("""
        SELECT Cards.prompt, Cards.answer, Cards.card_id
        FROM Decks
        INNER JOIN Cards
        ON Decks.deck_id = Cards.deck
        WHERE Decks.deck_id = %s AND Decks.user = %s;
    """, (deck_id, user_id))
    return cursor.fetchall()