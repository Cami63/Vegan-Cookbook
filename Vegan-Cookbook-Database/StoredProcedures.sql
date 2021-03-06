DELIMITER $$
CREATE PROCEDURE veg.getingredients ()
BEGIN
    SELECT ing.id, ing.ingredient_name
    FROM ingredients AS ing;
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
    -- do this in a transaction so the last insert id is correct
    SELECT LAST_INSERT_ID();
END$$
CREATE PROCEDURE veg.addingredient (
    ingre varchar(255)
)
BEGIN
    INSERT INTO veg.ingredients (ingredient_name)
    /*define things as unique so this will fail if such a value already exists*/
        VALUES (ingre);
    SELECT LAST_INSERT_ID();
END$$
CREATE PROCEDURE veg.addrecipe_step (
    step varchar(1000),
    num INT,
    recipeident BIGINT
)
BEGIN
    INSERT INTO veg.recipe_steps (step_number, step_description, recipe_id)
        VALUES (num, step, recipeident);
END$$
CREATE PROCEDURE veg.addmeal_recipes (
    mealident INT,
    recipeident BIGINT
)
BEGIN
    INSERT INTO veg.meal_recipes (meal_id, recipe_id)
        VALUES (mealident, recipeident);
END$$
CREATE PROCEDURE veg.addingredients_recipes (
    recipeident BIGINT,
    ingreident BIGINT
)
BEGIN
    INSERT INTO ingredients_recipes (recipe_id, ingredient_id)
        VALUES (recipeident, ingreident);
END$$
CREATE PROCEDURE veg.viewrecipesteps (
    recipeid BIGINT
)
BEGIN
    SELECT DISTINCT rec_step.step_number, rec_step.step_description
    FROM recipes AS rec
        RIGHT JOIN recipe_steps AS rec_step
            ON rec_step.recipe_id = recipeid
	ORDER BY rec_step.step_number;
END$$
CREATE PROCEDURE veg.viewrecipeingredients (
    recipeid BIGINT
)
BEGIN
    SELECT ing.ingredient_name
    FROM recipes AS rec
        RIGHT JOIN ingredients_recipes AS rec_ing
            ON recipeid = rec_ing.recipe_id
        LEFT JOIN ingredients AS ing
            ON ing.id = rec_ing.ingredient_id
	GROUP BY ing.ingredient_name;
END$$
CREATE PROCEDURE veg.viewrecipemealtimes (
    recipeid BIGINT
)
BEGIN
    SELECT rec.id, rec.recipe_name, nat.nationality, rec.health_rating, rec.prep_time_minutes, meal.meal_name
    FROM recipes AS rec
        LEFT JOIN nationality AS nat
            ON nat.id = rec.nationality_id
        LEFT JOIN meal_recipes AS meal_rec
            ON meal_rec.recipe_id = recipeid
        LEFT JOIN meal_types AS meal
            ON meal.id = meal_rec.meal_id
	WHERE rec.id = recipeid;
END$$
CREATE PROCEDURE veg.search (
    keywords1 varchar(255)
    ,keywords2 varchar (255)
    ,keywords3 varchar (255)
    ,keywords4 varchar (255)
    ,keywords5 varchar (255)
    ,prep_time_min INT
    ,prep_time_max INT
    ,includeing1 INT
    ,includeing2 INT
    ,includeing3 INT
    ,includeing4 INT
    ,includeing5 INT
    ,discludeing1 INT
    ,discludeing2 INT
    ,discludeing3 INT
    ,discludeing4 INT
    ,discludeing5 INT
    ,mealtime INT
    ,healthrat INT
)
BEGIN
    SELECT rec.id, rec.recipe_name
    FROM recipes AS rec
        RIGHT JOIN meal_recipes AS meal_rec
            ON meal_rec.recipe_id = rec.id
        LEFT JOIN meal_types AS meal
            ON meal.id = meal_rec.meal_id
        RIGHT JOIN recipe_steps as rec_step
            ON rec_step.recipe_id = rec.id
    WHERE (
			(rec.prep_time_minutes >= prep_time_min OR prep_time_min IS NULL) 
			AND (rec.prep_time_minutes <= prep_time_max OR prep_time_max IS NULL)
        )
        AND
        (
			(rec_step.step_description LIKE CONCAT('%', keywords1, '%')) OR
            (rec_step.step_description LIKE CONCAT('%', keywords2, '%')) OR
            (rec_step.step_description LIKE CONCAT('%', keywords3, '%')) OR
            (rec_step.step_description LIKE CONCAT('%', keywords4, '%')) OR
            (rec_step.step_description LIKE CONCAT('%', keywords5, '%')) OR
            (keywords1 IS NULL AND keywords2 IS NULL AND keywords3 IS NULL AND keywords4 IS NULL AND keywords5 IS NULL)
        )
        AND
        (
            meal.id = mealtime
            OR mealtime IS NULL
        )
        AND
        (
            rec.health_rating >= healthrat
            OR healthrat IS NULL
        )
        AND
        (
			(includeing1 IS NULL AND includeing2 IS NULL AND includeing3 IS NULL AND includeing4 IS NULL AND includeing5 IS NULL)
            OR
			(
				(
				SELECT COUNT(*)
				FROM ingredients_recipes AS rec_ing2
					LEFT JOIN ingredients AS ing2
						ON rec.id = rec_ing2.recipe_id
							AND ing2.id = rec_ing2.ingredient_id
				WHERE
					(ing2.id = includeing1
					OR ing2.id = includeing2
					OR ing2.id = includeing3
					OR ing2.id = includeing4
					OR ing2.id = includeing5)
				)
				=
				(IF(ISNULL(includeing1), 5, 
					IF(ISNULL(includeing2), 1, 
						IF(ISNULL(includeing3), 2, 
							IF(ISNULL(includeing4), 3, 
								IF(ISNULL(includeing5), 4, 5)
								)
							)
						)
					)
				)
            )
        )
        AND
        (
			(discludeing1 IS NULL AND discludeing2 IS NULL AND discludeing3 IS NULL AND discludeing4 IS NULL AND discludeing5 IS NULL)
            OR
			(
            SELECT COUNT(*)
            FROM ingredients_recipes AS rec_ing
				LEFT JOIN ingredients AS ing
					ON rec.id = rec_ing.recipe_id
						AND ing.id = rec_ing.ingredient_id
			WHERE (
				(ing.id = discludeing1)
				OR (ing.id = discludeing2)
				OR (ing.id = discludeing3)
				OR (ing.id = discludeing4)
				OR (ing.id = discludeing5)
                )
			)
			= 0
        )
        GROUP BY rec.id, rec.recipe_name;
END$$

DELIMITER ;