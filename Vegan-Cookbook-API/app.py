import mysql.connector
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask("vegan-cookbook-api")
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'

db = mysql.connector.connect(host="localhost", user="root", database="vegan_cookbook")

@app.route('/meal_types')
@cross_origin()
def get_meal_types():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM meal_types")
    return {
        "meal_types":cursor.fetchall()
    }

@app.route('/recipes')
@cross_origin()
def get_recipes():
    return {
        "recipes": [
            {
                "id": 3,
                "ingredients": [
                    "oil",
                    "onion",
                    "carrot"
                ],
                "name":"Sauteed Carrots and Onions",
                "health_rating": 4,
                "nationality": None,
                "prep_time_minutes": 20,
                "meal_type": [
                    "dinner",
                    "lunch"
                ],
                "steps": [
                    "Cut up veggies.",
                    "Heat the empty pan.",
                    "Add oil and heat until it flows like water."
                ]
            }
        ]
    }

@app.route('/ingredients')
@cross_origin()
def get_ingredients():
    return {
        "ingredients": [
            "oil",
            "onion",
            "carrot"
        ]
    }
