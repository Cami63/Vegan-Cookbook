CREATE DATABASE vegan_cookbook;

USE vegan_cookbook;

CREATE SCHEMA veg;

CREATE TABLE veg.recipes (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    recipe_name varchar(255), 
    health_rating INT NOT NULL, 
    nationality INT, 
    prep_time_minutes INT NOT NULL, 
    PRIMARY KEY (id),
    CONSTRAINT recipes_health_rating_ck CHECK ((health_rating >=1 AND health_rating <=5))
);
CREATE TABLE veg.ingredients (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    ingredient_name varchar(255) NOT NULL UNIQUE, 
    PRIMARY KEY (id) 
);

CREATE TABLE veg.ingredients_recipes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    recipe_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ingredients_recipes_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    CONSTRAINT ingredients_recipes_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);

CREATE TABLE veg.meal_types (
    id INT NOT NULL AUTO_INCREMENT, 
    meal_name varchar(31) NOT NULL UNIQUE,
    recipe_id BIGINT NOT NULL,
    PRIMARY KEY (id), 
    CONSTRAINT meal_types_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE veg.meal_recipes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    meal_id INT NOT NULL,
    recipe_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT meal_recipes_meal_id_fk FOREIGN KEY (meal_id) REFERENCES meal_types (id),
    CONSTRAINT meal_recipes_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id)
);

CREATE TABLE veg.recipe_steps (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    step_number INT NOT NULL,
    step_description varchar(1023), 
    recipe_id BIGINT NOT NULL, 
    PRIMARY KEY (id), 
    CONSTRAINT recipe_steps_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
