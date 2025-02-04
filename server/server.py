from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_location_name')
def get_location_name():
    response = jsonify({
        'location': util.get_location_name()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        # Access the form data from request.form
        total_sqft = float(request.form['total_sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])

        # Generate the estimated price using util.get_estimated_price()
        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

        # Generate the response
        response = jsonify({
            'estimated_price': estimated_price
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        # Return an error message if something goes wrong
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    try:
        util.load_saved_artifact()
        print("Starting Python Flask Server For Home Price Prediction")
        app.run(debug=True)
    except Exception as e:
        print(f"Error loading artifacts: {e}")
