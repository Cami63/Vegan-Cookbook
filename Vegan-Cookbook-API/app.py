import mysql.connector
import mysql.connector.pooling
from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask("vegan-cookbook-api")
cors = CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'
# app.py file
#app.run(port=5000)
# Don't use debug=True, because it disables the Visual Studio Code debugger
# app.run(port=5000, debug=True) - disables the Visual Studio Code debugger
def executeandclose(sql, params = None) :
    cursor, db = getnewcursor()
    result = cursor.execute(sql, params, multi=True)
    storedResult = []
    for res in result:
        if (res.with_rows == True):
            storedResult = cursor.fetchall()
    cursor.close()
    db.close()
    return storedResult

def executeprocandclose(procName, params = None) :
    cursor, db = getnewcursor()
    cursor.callproc(procName, params)
    result = cursor.stored_results()
    storedResult = []
    for res in result:
        #if (res.with_rows == True):
        storedResult = res.fetchall()
        break
    cursor.close()
    db.close()
    return storedResult


@app.route('/meal_types')
@cross_origin()
def get_meal_types():
    return {
        "meal_types":executeandclose("SELECT id, meal_name FROM veg.meal_types;")
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
    data = request.json
    proc = "search";
    return {
        "results": executeprocandclose(proc, [
            data["keywords1"],
            data["keywords2"],
            data["keywords3"],
            data["keywords4"],
            data["keywords5"],
            data["prep_time_min"],
            data["prep_time_max"],
            data["includeing1"],
            data["includeing2"],
            data["includeing3"],
            data["includeing4"],
            data["includeing5"],
            data["discludeing1"],
            data["discludeing2"],
            data["discludeing3"],
            data["discludeing4"],
            data["discludeing5"],
            data["mealtime"],
            data["healthrat"]
        ])
    }



@app.route('/recipe', methods = ['POST'])
@cross_origin()
def addrecipe ():
    data = request.json 

    cursor, db = getnewcursor()
    
    cursor.execute(f"""
        CALL veg.addrecipe(
        '{data["recipename"]}'
        ,{data["preptime"]}
        ,{data["nationalit"]}
        ,{data["healthrate"]});""")
    recipeId = cursor.fetchall()[0][0]
    
    cursor.execute(f"""
        CALL veg.addingredient(
            {data["ingredient"]}
        );""")
    ingredientId = cursor.fetchall()[0][0]

    cursor.execute(f"""
        CALL veg.addingredients_recipes(
            {recipeId}
            ,{ingredientId}
        );""")
    
    cursor.execute(f"""
        CALL veg.addrecipe_step(
            '{data["step"]}'
            ,{data["num"]}
            ,{recipeId}
        );""")

    cursor.execute(f"""
        CALL veg.addmeal_recipes(
            {data["mealId"]}
            ,{recipeId}
        );""")
    cursor.close()
    db.close()
    return viewrecipe(recipeId);


@app.route('/viewrecipesteps', methods = ['GET'])
@cross_origin()
def viewrecipesteps ():
    recipeid = request.args.get('recipeId')
    query = f"""
        CALL veg.viewrecipesteps(
            {recipeid}
        );"""
    return {
        "steps":executeandclose(query)
    }

@app.route('/viewrecipeingredients', methods = ['GET'])
@cross_origin()
def viewrecipeingredients ():
    recipeid = request.args.get('recipeId')
    query = f"""
        CALL veg.viewrecipeingredients(
            {recipeid}
        );"""
    return {
        "ingredients":executeandclose(query)
    }

@app.route('/viewrecipemealtimes', methods = ['GET'])
@cross_origin()
def viewrecipemealtimes ():
    recipeid = request.args.get('recipeId')
    query = f"""
        CALL veg.viewrecipemealtimes(
            {recipeid}
        );"""
    return {
        "mealtimes":executeandclose(query)
    }

@app.route('/ingredients')
@cross_origin()
def getingredients ():
    query = "CALL veg.getingredients();"
    return {
        "ingredients": executeandclose(query)
    }

def getnewcursor ():
    db = mysql.connector.connect(host="localhost", user="root", database="veg", password="Camiscode6363!", pool_name="vegPool", pool_size=4, auth_plugin="mysql_native_password")
    return db.cursor(), db

if __name__ == "__main__":
    app.run(port=5000)