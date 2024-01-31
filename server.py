from flask import Flask, jsonify, request

app = Flask(__name__)

players = dict()

@app.route('/')
def home():
    # You can replace this with any JSON data you want to return
    data = {"message": "Hello, World!"}
    return jsonify(data)

@app.route('/position', methods=['POST'])
def position():

    x = request.args.get('x')
    y = request.args.get('y')
    id = request.args.get('id')
    name = request.args.get('name')
    color = request.args.get('color')

    players[id] = (x, y, name, color)
    return True

@app.route('/get_position')
def get_position():
    return jsonify(players)

if __name__ == '__main__':
    app.run(port=803)
