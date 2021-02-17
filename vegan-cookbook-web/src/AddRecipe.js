import './AddRecipe.css';
import { React, useState, useEffect } from 'react';


export default function AddRecipe(props) {
    const arrayOfIng
    const ArrayOfStep
    const recname = useRef();
    const preptime = useRef();
    const national = useRef();
    const healthrat = healthRating;
    const arrayOfMeal
    const [mealArray, setMealArray] = useState([]);
    const [healthRating, setHealthRating] = useState();
    const [ingredientArray, setIngredientArray] = useState([]);
    const [stepArray, setStepArray] = useState([]);
    const addIndexIng = () => {
        setIngredientArray(original => [...original," "]);
    };
    const addIndexStep = () => {
        setStepArray(original => [...original," "])
    };
    const addedIngredient = () => {
        ingredientArray.map((ingredient, index) => {
            <div>
                <label for={index} >Ingredient {index}: </label>
                <input id={index} ref={index} type="text"></input>
            </div>
        })
    };
    const addedStep = () => {
        stepArray.map((step, index) => {
            <div>
                <label for={index} >Step {index}. </label>
                <input id={index} ref={index} type="text"></input>
            </div>
        })
    };
    return (
        <div>
            <label for="recname">What is the name of your recipe?</label>
            <input ref={recname} type="text" id="recname"></input>
            <label>What is the amount of time it takes to prepare this recipe in minutes?</label>
            <input ref={preptime} type="number"></input>
            <label for="mealtime">For which meal types would this recipe fit best?</label>
            <ul>
                //Need to 
                {props.mealTypes.map((mealType) => 
                    <li>
                        <input checked={selectedMealType===mealType[0]} onChange={(event) => setSelectedMealType(mealType[0])} type="radio" id={mealType[1]} name="meal" value={mealType[0]}></input>
                        <label for={mealType[1]}>{mealType[1]}</label>
                        <br />
                    </li>)
                }
            </ul>
            <label for="nationality">What (if any) is the nationality or cultural background of your reicpe?</label>
            <input ref={national} type="text" id="nationality"></input>
            <label>What is the heatlh rating of your recipe (with 5 being extremely healthy and 1 being extremely unhealthy)?</label>
            <ul>
                <li onChange={setHealthRating(1)}>
                    <input type="radio">1</input>
                </li>
                <li onChange={setHealthRating(2)}>
                    <input type="radio">2</input>
                </li>
                <li onChange={setHealthRating(3)}>
                    <input type="radio">3</input>
                </li>
                <li onChange={setHealthRating(4)}>
                    <input type="radio">4</input>
                </li>
                <li onChange={setHealthRating(5)}>
                    <input type="radio">5</input>
                </li>
            </ul>
            <label>What are the ingredients in your recipe?</label>
                    < addedIngredient />
                    <button onClick={addIndexIng}>Add Ingredient</button>
            <label>What are the steps to prepare your recipe?</label>
                    < addedStep />
                    <button onClick={addIndexStep}>Add Step</button>
        </div>
    )
}