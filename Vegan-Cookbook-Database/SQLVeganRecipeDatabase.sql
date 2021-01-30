CREATE TABLE recipes (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    recipe_name varchar(255), 
    health_rating INT NOT NULL, 
    nationality INT NOT NULL, 
    prep_time_minutes INT NOT NULL, 
    PRIMARY KEY (recipe_id)
    CONSTRAINT health_rating_ck CHECK ((health_rating >=1 AND health_rating <=5))
);
CREATE TABLE ingredients (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    ingredient_name varchar(255) NOT NULL UNIQUE, 
    PRIMARY KEY (id), 
);
CREATE TABLE ingredients_recipes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    recipe_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    CONSTRAINT ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);
CREATE TABLE meal_types (
    id INT NOT NULL AUTO_INCREMENT, 
    meal_name varchar(31) NOT NULL UNIQUE,
    PRIMARY KEY (id), 
    CONSTRAINT meal_types_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
CREATE TABLE meal_recipes (
    id INT NOT NULL AUTO_INCREMENT,
    meal_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT meal_id_fk FOREIGN KEY (meal_id) REFERENCES meal_types (id),
    CONSTRAINT recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes (id)
);
CREATE TABLE recipe_steps (
    id BIGINT NOT NULL AUTO_INCREMENT, 
    step_description varchar(1023), 
    recipe_id INT NOT NULL, 
    PRIMARY KEY (id), 
    CONSTRAINT recipe_steps_recipe_id_fk FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);