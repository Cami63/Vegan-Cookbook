DELIMITER $$
CREATE PROCEDURE veg.getingredientid (
    ingrename varchar(255)
)
BEGIN
    SELECT ing.id
    FROM ingredients AS ing
    WHERE ing.ingredient_name = ingrename
END$$
CREATE PROCEDURE veg.getmealid (
    mealname varchar(12)
)
BEGIN
    SELECT meal.id
    FROM meal_types AS meal
    WHERE meal.meal_name = mealname
END$$
CREATE PROCEDURE veg.getrecipeid (
    recipenam varchar(255)
)
BEGIN
    SELECT rec.id
    FROM recipes AS rec
    WHERE rec.recipe_name = recipename
END$$
CREATE PROCEDURE veg.getnationalityid (
    nationalitname varchar(255)
)
BEGIN
    SELECT nat.id
    FROM nationality AS nat
    WHERE nat.nationality = nationalitname
END$$
CREATE PROCEDURE veg.addrecipe (
    recipename varchar(255)
    ,preptime INT
    ,nationalit INT
    ,healthrate INT
)
BEGIN
    INSERT INTO veg.recipes (recipe_name, health_rating, nationality_id, prep_time_minutes)
        VALUES (recipename, healthrate, nationalit, preptime);
    /*define things as unique so this will fail if such a value already exists*/
END$$
CREATE PROCEDURE veg.addingredient (
    ingre varchar(255)
)
BEGIN
    INSERT INTO veg.ingredients (ingredient_name)
    /*define things as unique so this will fail if such a value already exists*/
        VALUES (ingre)
END$$
CREATE PROCEDURE veg.addrecipe_steps (
    step varchar(1000)
    num INT
    recipeident BIGINT
)
BEGIN
    INSERT INTO veg.recipe_steps (step_number, step_description, recipe_id)
        VALUES (num, step, ident)
END$$
CREATE PROCEDURE veg.addmeal_recipes (
    mealident
    recipeident
)
BEGIN
    INSERT INTO veg.meal_recipes (meal_id, recipe_id)
        VALUES (mealident, recipeident)
END$$
CREATE PROCEDURE veg.addingredients_recipes (
    recipeident BIGINT
    ingreident BIGINT
)
BEGIN
    INSERT INTO ingredients_recipes (recipe_id, ingredient_id)
        VALUES (recipeident, ingreident)
END$$
CREATE PROCEDURE veg.viewrecipe (
    recipeid BIGINT
)
BEGIN
    SELECT rec.id, rec.recipe_name, nat.nationality, rec.health_rating, rec.prep_time_minutes, ing.ingredient_name, meal.meal_name, rec_step.step_number, rec_step.step_description
    FROM recipes AS rec
        LEFT JOIN nationality AS nat
            ON nat.nationality_id = rec.id
        RIGHT JOIN recipes_ingredients AS rec_ing
            ON rec.id = rec_ing.recipe_id
        LEFT JOIN ingredients AS ing
            ON ing.ingredient_id = rec_ing.ingredient_id
        LEFT JOIN meal_recipes AS meal_rec
            ON meal_rec.recipe_id = rec.id
        LEFT JOIN meal_types AS meal
            ON meal.id = meal_rec.meal_id
        LEFT JOIN recipe_steps as rec_step
            ON rec_step.recipe_id = rec.id
    WHERE rec.id = recipeid
END$$
CREATE PROCEDURE veg.search (
    keywords1 varchar(255)
    ,keywords2 varchar (255)
    ,keywords3 varchar (255)
    ,keywords4 varchar (255)
    ,keywords5 varchar (255)
    ,prep_time_min INT
    ,prep_time_max INT
    ,includeing1 varchar(255)
    ,includeing2 varchar(255)
    ,includeing3 varchar(255)
    ,includeing4 varchar(255)
    ,includeing5 varchar(255)
    ,discludeing1 varchar (255)
    ,discludeing2 varchar (255)
    ,discludeing3 varchar (255)
    ,discludeing4 varchar (255)
    ,discludeing5 varchar (255)
    ,mealtime varchar (12)
    ,healthrat INT
)
BEGIN
    -- SQL here
END$$

DELIMITER ;
/*Need to create SELECT statements for all of the possibilites of what the user may have filled out/left blank?! First one I assume the user filled in everything. */
SELECT rec.id, rec.recipe_name
FROM recipes AS rec
    LEFT JOIN nationality AS nat
        ON nat.nationality_id = rec.id
    RIGHT JOIN recipes_ingredients AS rec_ing
        ON rec.id = rec_ing.recipe_id
    LEFT JOIN ingredients AS ing
        ON ing.ingredient_id = rec_ing.ingredient_id
    LEFT JOIN meal_recipes AS meal_rec
        ON meal_rec.recipe_id = rec.id
    LEFT JOIN meal_types AS meal
        ON meal.id = meal_rec.meal_id
    LEFT JOIN recipe_steps as rec_step
        ON rec_step.recipe_id = rec.id
WHERE (
        (rec.prep_time_minutes >= prep_time_min AND rec.prep_time_minutes <= prep_time_max)
        OR 
        (rec.prep_time_minutes >= prep_time_min AND prep_time_max = NULL)
        OR 
        (rec.prep_time_minutes <= prep_time_max AND prep_time_min = NULL)
        OR 
        (prep_time_max = NULL AND prep_time_min = NULL)
    )
    AND
    (
        meal.meal_name = mealtime
        OR mealtime = NULL
    )
    AND
    (
        rec.health_rating = healthrat
        OR mealtime = NULL
    )
    AND
    (
        (ing.ingredient_name = includeing1
        OR ing.ingredient_name = includeing2
        OR ing.ingredient_name = includeing3
        OR ing.ingredient_name = includeing4
        OR ing.ingredient_name = includeing5)
        OR
        (includeing1 = includeing2 = includeing3 = includeing4 = includeing5 = NULL)
    )
    AND
    (
        ((ing.ingredient_name != discludeing1) OR (discludeing1 = NULL)
        AND ((ing.ingredient_name != discludeing2) OR (discludeing2 = NULL))
        AND ((ing.ingredient_name != discludeing3) OR (discludeing3 = NULL))
        AND ((ing.ingredient_name != discludeing4) OR (discludeing4 = NULL))
        AND ((ing.ingredient_name != discludeing5) OR (discludeing5 = NULL))
        )
    );