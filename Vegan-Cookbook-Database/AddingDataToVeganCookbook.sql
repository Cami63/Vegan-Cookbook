INSERT INTO veg.nationality (nationality)
VALUES ('Middle Eastern');

INSERT INTO veg.recipes (
    recipe_name
    ,health_rating 
    ,nationality_id
    ,prep_time_minutes
)
VALUES ('Falafel', 3, 1, 200);

INSERT INTO veg.meal_types (meal_name)
VALUES ('Breakfast')
    ,('Lunch')
    ,('Dinner')
    ,('Snack')
    ,('Dessert');

INSERT INTO veg.ingredients (ingredient_name)
VALUES ('Chickpeas')
    ,('Onion')
    ,('Parsley')
    ,('Cumin')
    ,('Oil')
    ,('Salt');

INSERT INTO veg.recipe_steps (
    step_number
    ,step_description
    ,recipe_id
)
VALUES (1, 'Food process everything but the oil', 1)
    ,(2, 'Heat up oil for frying', 1)
    ,(3, 'Put balls of falafel in frying pan', 1);

INSERT INTO veg.ingredients_recipes (
    recipe_id
    ,ingredient_id
)
VALUES (1, 1)
    ,(1, 2)
    ,(1, 3)
    ,(1, 4)
    ,(1, 5)
    ,(1, 6);

INSERT INTO veg.meal_recipes (
    meal_id
    ,recipe_id
)
VALUES (2, 1)
    ,(3, 1);
