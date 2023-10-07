import os
import pymysql
from flask import jsonify
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

CLOUD_SQL_USERNAME = os.getenv('CLOUD_SQL_USERNAME', default=None)
CLOUD_SQL_PASSWORD = os.getenv('CLOUD_SQL_PASSWORD', default=None)
CLOUD_SQL_DATABASE_NAME = os.getenv('CLOUD_SQL_DATABASE_NAME', default=None)
CLOUD_SQL_CONNECTION_NAME = os.getenv('CLOUD_SQL_CONNECTION_NAME', default=None)


def open_connection():
    unix_socket = '/cloudsql/{}'.format(CLOUD_SQL_CONNECTION_NAME)
    try:
        if os.environ.get('GAE_ENV') == 'standard':
            connection = pymysql.connect(user=CLOUD_SQL_USERNAME,
                                   password=CLOUD_SQL_PASSWORD,
                                   unix_socket=unix_socket,
                                   db=CLOUD_SQL_DATABASE_NAME,
                                   cursorclass=pymysql.cursors.DictCursor
                                   )
    except pymysql.MySQLError as e:
        return e
    return connection


def get():
    connection = open_connection()
    with connection.cursor() as cursor:
        result = cursor.execute('SELECT * FROM songs;')
        songs = cursor.fetchall()
        if result > 0:
            got_songs = jsonify(songs)
        else:
            got_songs = 'No Songs in DB'
        return got_songs


def create(song):
    connection = open_connection()
    with connection.cursor() as cursor:
        cursor.execute('INSERT INTO songs (title, artist, genre) VALUES(%s, %s, %s)',
                       (song["title"], song["artist"], song["genre"]))
    connection.commit()
    connection.close()
