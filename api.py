from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Connect PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        dbname="your_dbname",
        user="your_username",
        password="your_password",
        host="your_host",
        port="your_port"
    )
    return conn

# API endpoints to retrieve ranking data(Rest API)
@app.route('/api/rankings', methods=['GET'])
def get_rankings():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT rank, player_name, score FROM rankings ORDER BY rank ASC')
    rankings = cursor.fetchall()
    cursor.close()
    conn.close()
    # Return results in JSON format
    return jsonify([{'rank': rank, 'player_name': name, 'score': score} for rank, name, score in rankings])

if __name__ == '__main__':
    app.run(debug=True, port=5001)
