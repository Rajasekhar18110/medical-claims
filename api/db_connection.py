from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func, text
import psycopg2

def get_db_connection(username, password):
    conn = psycopg2.connect(database='deglaofji4b26q',
                            user=username,
                            password=password,
                            host = 'ec2-23-20-224-166.compute-1.amazonaws.com',
                            port = 5432)
    return conn
