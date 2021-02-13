import mysql.connector
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask("vegan-cookbook-api")
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'

db = mysql.connector.connect(host="localhost", user="root", database="veg", password="Camiscode6363!")

@app.route('/meal_types')
@cross_origin()
def get_meal_types():
    cursor = db.cursor()
    cursor.execute("SELECT id, meal_name FROM meal_types")
    return {
        "meal_types":cursor.fetchall()
    }

@app.route('/recipes')
@cross_origin()
def get_recipes():
    cursor = db.cursor()
    cursor.execute("SELECT id, recipe_name, health_rating, nationality_id, prep_time_minutes FROM recipes")
    return {
        "recipes":cursor.fetchall()
    }

@app.route('/ingredients')
@cross_origin()
def get_ingredients():
    cursor = db.cursor()
    cursor.execute("SELECT id, ingredient_name FROM ingredients")
    return {
        "ingredients":cursor.fetchall()
    }

@app.route('/search')
@cross_origin()
def search(keywords1
,keywords2
,keywords3
,keywords4
,keywords5
,prep_time_min
,prep_time_max
,includeing1
,includeing2
,includeing3
,includeing4
,includeing5
,discludeing1
,discludeing2
,discludeing3
,discludeing4
,discludeing5
,mealtime
,healthrat):
    cursor = db.cursor()
    cursor.execute(f"""
        CALL veg.search(
        '{keywords1}',
        '{keywords2}',
        '{keywords3}',
        '{keywords4}',
        '{keywords5}',
        {prep_time_min},
        {prep_time_max},
        '{includeing1}',
        '{includeing2}',
        '{includeing3}',
        '{includeing4}'
        ,'{includeing5}'
        ,'{discludeing1}'
        ,'{discludeing2}'
        ,'{discludeing3}'
        ,'{discludeing4}'
        ,'{discludeing5}'
        ,{mealtime}
        ,{healthrat})""")
    return {
        "results": cursor.fetchall()
    }



@app.route('/recipe', methods = ['POST'])
@cross_origin()
def addrecipe (recipename
,preptime
,nationalit
,healthrate):
    cursor = db.cursor()
    cursor.execute(f"""
        CALL veg.addrecipe(
        '{recipename}'
        ,{preptime}
        ,{nationalit}
        ,{healthrate})""")
    return {
        "recipe": cursor.fetchall()
    }