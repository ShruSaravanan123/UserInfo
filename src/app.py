import pyodbc
from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

server = 'SHRUZZPC22'
database = 'USERS'
username = 'SHRUZZPC22\Shru'
password = ''
driver= '{ODBC Driver 17 for SQL Server}'

connection_string = f"Driver={{ODBC Driver 17 for SQL Server}};Server={server};Database={database};Trusted_Connection=Yes"
connection = pyodbc.connect(connection_string)
cursor = connection.cursor()


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    username = f"{firstName.lower()}.{lastName.lower()}" 
    # username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing fields'}), 400

    try:
        cursor.execute(
            "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
            (username, email, password)
        )
        connection.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True)