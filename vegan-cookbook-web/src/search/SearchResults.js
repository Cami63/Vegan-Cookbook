import { useState } from "react";
import ApiConnector from "../api/ApiConnector";
import ViewRecipe from './ViewRecipe';

export default function SearchResults(props) {
    const [viewRecipeStepsResult, setViewRecipeStepsResult] = useState();
    const [viewRecipeIngredientsResult, setViewRecipeIngredientsResult] = useState();
    const [viewRecipeMealTimesResult, setViewRecipeMealTimesResult] = useState();
    const [currentrecipeid, setcurrentrecipeid] = useState();

    const viewrecipesteps = (recipeId) => {
        return ApiConnector.viewRecipeSteps(recipeId).then(result => {setViewRecipeStepsResult(result.steps)})
    };
    const viewrecipeingredients = (recipeId) => {
        return ApiConnector.viewRecipeIngredients(recipeId).then(result => {setViewRecipeIngredientsResult(result.ingredients)})
    };
    const viewrecipemealtimes = (recipeId) => {
        return ApiConnector.viewRecipeMealTimes(recipeId).then(result => {setViewRecipeMealTimesResult(result.mealtimes)})
    };

    const viewRecipe = (recipeId) => {
        //Waiting for all the promises to be fulfilled
        Promise.all([
            viewrecipesteps(recipeId),
            viewrecipeingredients(recipeId),
            viewrecipemealtimes(recipeId),
        ]).then(() => {
            setcurrentrecipeid(recipeId);
        });
    };

    return (
        <ul>
            {props.searchResults.map( (result) =>
                <div>
                    <button key={result[0]} onClick={() => viewRecipe(result[0])}>
                        {result[1]}
                    </button>
                    {(currentrecipeid===result[0]) && < ViewRecipe viewRecipeSteps={viewRecipeStepsResult} viewRecipeIngredients={viewRecipeIngredientsResult} viewRecipeMealTimes={viewRecipeMealTimesResult}/>}
                </div>
            )}
        </ul>
    );
}