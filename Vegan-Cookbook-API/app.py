import mysql.connector
from flask import Flask, request
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
"""
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
"""
@app.route('/search', methods = ['POST'])
@cross_origin()
def search():
    cursor = db.cursor()
    cursor.execute(f"""
        CALL veg.search(
        '{data["keywords1"]}',
        '{data["keywords2"]}',
        '{data["keywords3"]}',
        '{data["keywords4"]}',
        '{data["keywords5"]}',
        {data["prep_time_min"]},
        {data["prep_time_max"]},
        '{data["includeing1"]}',
        '{data["includeing2"]}',
        '{data["includeing3"]}',
        '{data["includeing4"]}'
        ,'{data["includeing5"]}'
        ,'{data["discludeing1"]}'
        ,'{data["discludeing2"]}'
        ,'{data["discludeing3"]}'
        ,'{data["discludeing4"]}'
        ,'{data["discludeing5"]}'
        ,{data["mealtime"]}
        ,{data["healthrat"]})""")
    return {
        "results": cursor.fetchall()
    }



@app.route('/recipe', methods = ['POST'])
@cross_origin()
def addrecipe ():
    data = request.json 

    cursor = db.cursor()
    
    cursor.execute(f"""
        CALL veg.addrecipe(
        '{data["recipename"]}'
        ,{data["preptime"]}
        ,{data["nationalit"]}
        ,{data["healthrate"]})""")
    recipeId = cursor.fetchall()[0][0]
    
    cursor.execute(f"""
        CALL veg.addingredient(
            {data["ingredient"]}
        )""")
    ingredientId = cursor.fetchall()[0][0]

    cusor.execute(f"""
        CALL veg.addingredients_recipes(
            {recipeId}
            ,{ingredientId}
        )""")
    
    cursor.execute(f"""
        CALL veg.addrecipe_step(
            '{data["step"]}'
            ,{data["num"]}
            ,{recipeId}
        )""")

    cursor.execute(f"""
        CALL veg.addmeal_recipes(
            {data["mealId"]}
            ,{recipeId}
        )""")
    return viewrecipe(recipeId);


@app.route('/recipe', methods = ['GET'])
@cross_origin()
def viewrecipe (recipeid):
    cursor = db.cursor()
    cursor.execute(f"""
        CALL veg.viewrecipe(
            {recipeid}
        )""")
    return {
        "recipe":cursor.fetchall()
    }

@app.route('/ingredients')
@cross_origin()
def getingredients ():
    cursor = db.cursor()
    cursor.execute(f"""
        CALL veg.getingredients()""")
    return {
        "ingredients":cursor.fetchall()
    }