DELIMITER $$

CREATE PROCEDURE veg.search (
    keywords varchar(255)
    ,
)
BEGIN
    -- SQL here
END$$

DELIMITER ;

SELECT recipe_name
FROM recipes AS rec
    LEFT JOIN nationality AS nat
        ON nat.nationality_id = rec.id