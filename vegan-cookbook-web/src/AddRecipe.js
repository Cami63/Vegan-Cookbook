import './AddRecipe.css';
import { React, useState, useEffect } from 'react';

export default function AddedIngredient() {
    return (
        
    )
};
export default function AddRecipe(props) {
    const 
    return (
        <div>
            <label for="recname">What is the name of your recipe?</label>
            <input type="text" id="recname"></input>
            <label>What is the amount of time it takes to prepare this recipe in minutes?</label>
            <input type="number"></input>
            <label for="mealtime">For which meal types would this recipe fit best?</label>
            <ul>
                {props.mealTypes.map((mealType) => 
                    <li>
                        <input checked={selectedMealType===mealType[0]} onChange={(event) => setSelectedMealType(mealType[0])} type="radio" id={mealType[1]} name="meal" value={mealType[0]}></input>
                        <label for={mealType[1]}>{mealType[1]}</label>
                        <br />
                    </li>)
                    }
            </ul>
            <label for="nationality">What (if any) is the nationality or cultural background of your reicpe?</label>
            <input type="text" id="nationality"></input>
            <label>What is the heatlh rating of your recipe (with 5 being extremely healthy and 1 being extremely unhealthy)?</label>
            <ul>
                <li>
                    <input type="radio">1</input>
                </li>
                <li>
                    <input type="radio">2</input>
                </li>
                <li>
                    <input type="radio">3</input>
                </li>
                <li>
                    <input type="radio">4</input>
                </li>
                <li>
                    <input type="radio">5</input>
                </li>
            </ul>
            <label>What are the ingredients in your recipe?</label>
                    < AddedIngredient />
                    <button onClick>Add Ingredient</button>
            <label>What are the steps to prepare your recipe?</label>
        </div>
    )
}