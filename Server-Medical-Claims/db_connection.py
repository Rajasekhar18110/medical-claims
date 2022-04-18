from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func, text
import psycopg2

def get_db_connection(username, password):
    conn = psycopg2.connect(host='localhost',
                            database='medical_claims',
                            user=username,
                            password=password)
    return conn
