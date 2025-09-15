from flask import Flask, jsonify, request
from flask_cors import CORS  # fix import here
import json
import os

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

DATA_FILE = 'users.json'

def read_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def write_users(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(read_users())

@app.route('/api/update-password', methods=['POST'])
def update_password():
    data = request.json
    username = data.get('username')
    new_password = data.get('password')  # keep consistent naming with frontend

    if not username or not new_password:
        return jsonify({"success": False, "message": "Username and password required"}), 400

    users = read_users()
    found = False

    for user in users:
        if user['username'] == username:
            user['password'] = new_password
            found = True
            break

    if not found:
        return jsonify({"success": False, "message": "User not found"}), 404

    write_users(users)
    return jsonify({"success": True, "message": f"Password updated for {username}"})


if __name__ == '__main__':
    app.run(debug=True)
