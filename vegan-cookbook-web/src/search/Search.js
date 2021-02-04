import './Search.css';
import Api from '../api/Api';

import { useState, useEffect } from 'react';
/*
import React from 'react';
import ReactDOM from 'react-dom';
class SearchResults extends React.Component {
    render () {
        return ()
    }


}
ReactDOM.render(ShowResults, document.getElementById('Search'))

 */

function Search(props) {
    const [ingredients, setIngredients] = useState([]);
    const [includedIngredients, setIncludedIngredients] = useState([]);
    const [excludedIngredients, setExcludedIngredients] = useState([]);

    useEffect(() => {
        Api.getIngredients().then(resp => setIngredients(resp.ingredients));
    }, []);

    const includedIngredientSelected = (inputIndex, inputValue) => {

    }

    const excludedIngredientSelected = (inputIndex, inputValue) => {

    }

    return (
    <main>
        <div class="search-recipes-lbl">
                <h3>
                    Search Recipes:
                </h3>
        </div>
        <div class="search-methods">
            <div class="include-ingredients">
                <ol id="inc-ing">
                    <li id="l11">
                        <select onChange={(event) => includedIngredientSelected(0, event?.target?.value)}>
                            {
                                ingredients.map(
                                    (ingredient, i) => 
                                        <option key={i} value={i}>{ingredient}</option>)
                            }
                        </select>
                    </li>
                    <li id="l12"><select><option></option></select></li>
                    <li id="l13"><select><option></option></select></li>
                    <li id="l14"><select><option></option></select></li>
                    <li id="l15"><select><option></option></select></li>
                </ol>
                <label id="lbl-inc-ing" for="inc-ing">Include Ingredients:</label>
            </div>
            <div class="disclude-ingredients">
                <ol id="dis-ing">
                    <li id="l21"><select><option></option></select></li>
                    <li id="l22"><select><option></option></select></li>
                    <li id="l23"><select><option></option></select></li>
                    <li id="l24"><select><option></option></select></li>
                    <li id="l25"><select><option></option></select></li>
                </ol>
                <label id="lbl-dis-ing" for="dis-ing">Disclude Ingredients:</label>
            </div>
            <div class="meal-time">
                <ul id="meal">
                    <input type="checkbox" id="breakfast" name="meal" value="breakfast"></input>
                    <label for="breakfast">Breakfast</label>
                    <br />
                    <input type="checkbox" id="lunch" name="meal" value="lunch"></input>
                    <label for="lunch">Lunch</label>
                    <br />
                    <input type="checkbox" id="dinner" name="meal" value="dinner"></input>
                    <label for="dinner">Dinner</label>
                    <br />
                    <input type="checkbox" id="snack" name="meal" value="snack"></input>
                    <label for="snack">Snack</label>
                    <br />
                    <input type="checkbox" id="dessert" name="meal" value="dessert"></input>
                    <label for="dessert">Dessert</label>
                </ul>
                <label for="meal" id="lbl-meal">Meal Time:</label>
            </div>
            <div class="health-rating">
                <ul id="health-rat">
                    <input type="checkbox" id="one" name="rating" value="1" />
                    <label for="one">1</label>
                    <br />
                    <input type="checkbox" id="two" name="rating" value="2" />
                    <label for="two">2</label>
                    <br />
                    <input type="checkbox" id="three" name="rating" value="3" />
                    <label for="three">3</label>
                    <br />
                    <input type="checkbox" id="four" name="rating" value="4" />
                    <label for="four">4</label>
                    <br />
                    <input type="checkbox" id="five" name="rating" value="5" />
                    <label for="five">5</label>
                </ul>
                <label for="health-rat" id="lbl-health">Health Rating:</label>
            </div>
            <div class="keywords">
              <ol id="kw">
                  <li id="l31"><select><option></option></select></li>
                  <li id="l32"><select><option></option></select></li>
                  <li id="l33"><select><option></option></select></li>
                  <li id="l34"><select><option></option></select></li>
                  <li id="l35"><select><option></option></select></li>
              </ol>
              <label for="kw" id="keyw">Keywords:</label>
            </div>
            <div class="prep-time">
                <label for="minimum" id="lbl-min">Minimum Amount of Preparation Time(Minutes):</label>
                <input type="number" name="minutes" id="minimum" step="1"></input>
                <label for="maximum" id= "lbl-max">Maximum Amount of Preparation Time(Minutes):</label>
                <input type="number" name="minutes" id="maximum" step="1"></input>
            </div>
        </div>
        <div onClick={SearchResults} class="search-btn">
            <h3>SEARCH</h3>
        </div>
    </main>
    );
}

export default Search;