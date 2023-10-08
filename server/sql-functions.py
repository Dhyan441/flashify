# kiera figuring out sql
import os
from flask import Flask, request, jsonify
import pymysql.cursors
from dotenv import find_dotenv, load_dotenv

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

cursor = conn.cursor()

def getDecksFromUser(user_id: int):
    cursor.execute("""
        SELECT Decks.name, Decks.deck_id
        FROM User
        INNER JOIN Decks
        ON User._id = Decks.user
        WHERE User._id = %s;
    """, user_id)
    return cursor.fetchall()

def getCardsFromDeck(deck_id: int):
    cursor.execute("""
        SELECT Cards.prompt, Cards.answer, Cards.card_id
        FROM Decks
        INNER JOIN Cards
        ON Decks.deck_id = Cards.deck
        WHERE Decks.deck_id = %s;
    """, deck_id)
    return cursor.fetchall()

@app.route("/")
def hello():
    return getCardsFromDeck(1)
    # return len(getDecksFromUser('lebron'))

    # cursor.execute("""
    #     INSERT INTO Cards (prompt, answer, deck) VALUES ('leprompt', 'lanswer', 1);
    # """)
    # conn.commit()
    # return cursor.fetchall()