from flask import Flask, jsonify, request, send_from_directory
import json, os

app = Flask(__name__, static_folder="static")
USERS_FILE = 'users.json'
PRODUCTS_FILE = 'products.json'

def read_json(file):
    if not os.path.exists(file):
        return []
    with open(file, 'r') as f:
        return json.load(f)

def write_json(file, data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=2)

# ---------- USERS ----------
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(read_json(USERS_FILE))

@app.route('/api/update-password', methods=['POST'])
def update_password():
    data = request.json
    username = data.get('username')
    new_password = data.get('password')

    users = read_json(USERS_FILE)
    found = False
    for user in users:
        if user['username'] == username:
            user['password'] = new_password
            found = True
            break

    if not found:
        return jsonify({"success": False, "message": "User not found"}), 404

    write_json(USERS_FILE, users)
    return jsonify({"success": True, "message": f"Password updated for {username}"})

# ---------- PRODUCTS ----------
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(read_json(PRODUCTS_FILE))

@app.route('/api/add-product', methods=['POST'])
def add_product():
    data = request.json
    name = data.get('name')
    price = data.get('price')

    products = read_json(PRODUCTS_FILE)
    products.append({"name": name, "price": price})
    write_json(PRODUCTS_FILE, products)

    return jsonify({"success": True, "message": f"Product '{name}' added!"})

# ---------- SERVE HTML ----------
@app.route('/')
def index():
    return send_from_directory('.', 'giftzbash.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)