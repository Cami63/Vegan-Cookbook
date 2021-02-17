export default function ViewRecipe(props) {
    
    return (
        <div>
            <h4>Prep time: {props.viewRecipeMealTimes[0][4]}</h4>
            <h4>Nationality: {props.viewRecipeMealTimes[0][2]}</h4>
            <h4>Health Rating: {props.viewRecipeMealTimes[0][3]}</h4>
            <h4>Meal Times: </h4>
            {props.viewRecipeMealTimes.map((result) =>
                <h4>{result[5]}</h4>)
            }
            <h4>Ingredients: </h4>
            {props.viewRecipeIngredients.map((result) =>
                <h4>{result[0]}</h4>)
            }
            <h4>Steps: </h4>
            {props.viewRecipeSteps.map((result) =>
                <h4>{result[0]}. {result[1]}</h4>)
            }
        </div>
    )
};