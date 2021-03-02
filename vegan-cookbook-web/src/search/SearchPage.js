import './Search.css';
import ApiConnector from '../api/ApiConnector';
import SearchResults from './SearchResults';
import { useState, useEffect, useRef } from 'react';
/*Display of the search results is just going to*/
function SearchPage(props) {
    const includeIngredient1 = useRef();
    const includeIngredient2 = useRef();
    const includeIngredient3 = useRef();
    const includeIngredient4 = useRef();
    const includeIngredient5 = useRef();
    const discludeIngredient1 = useRef();
    const discludeIngredient2 = useRef();
    const discludeIngredient3 = useRef();
    const discludeIngredient4 = useRef();
    const discludeIngredient5 = useRef();
    const keyword1 = useRef();
    const keyword2 = useRef();
    const keyword3 = useRef();
    const keyword4 = useRef();
    const keyword5 = useRef();
    const prepmin = useRef();
    const prepmax = useRef();
    const [selectedMealType, setSelectedMealType] = useState(props?.mealTypes?.[0]?.[0]);
    const [healthRating, setHealthRating] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        ApiConnector.getIngredients().then(results => setIngredients(results.ingredients));
    }, []);
    /*I am creating a function to collect all of the user's data, I will then pass the results of this function into SearchResults.js*/
    const onUserClickedSearch = () => {
        const searchIncludeIngredient1 = Number(includeIngredient1.current.value) || null;
        const searchIncludeIngredient2 = Number(includeIngredient2.current.value) || null;
        const searchIncludeIngredient3 = Number(includeIngredient3.current.value) || null;
        const searchIncludeIngredient4 = Number(includeIngredient4.current.value) || null;
        const searchIncludeIngredient5 = Number(includeIngredient5.current.value) || null;
        const searchDiscludeIngredient1 = Number(discludeIngredient1.current.value) || null;
        const searchDiscludeIngredient2 = Number(discludeIngredient2.current.value) || null;
        const searchDiscludeIngredient3 = Number(discludeIngredient3.current.value) || null;
        const searchDiscludeIngredient4 = Number(discludeIngredient4.current.value) || null;
        const searchDiscludeIngredient5 = Number(discludeIngredient5.current.value) || null;
        const searchKeyword1 = keyword1.current.value || null;
        const searchKeyword2 = keyword2.current.value || null;
        const searchKeyword3 = keyword3.current.value || null;
        const searchKeyword4 = keyword4.current.value || null;
        const searchKeyword5 = keyword5.current.value || null;
        const searchPrepmin = prepmin.current.value || null;
        const searchPrepmax = prepmax.current.value || null;
        const searchHealthRating = healthRating;
        const searchSelectedMealType = selectedMealType;
        ApiConnector.search({
            keywords1:searchKeyword1
            ,keywords2:searchKeyword2
            ,keywords3:searchKeyword3
            ,keywords4:searchKeyword4
            ,keywords5:searchKeyword5
            ,prep_time_min:searchPrepmin
            ,prep_time_max:searchPrepmax
            ,includeing1:searchIncludeIngredient1
            ,includeing2:searchIncludeIngredient2
            ,includeing3:searchIncludeIngredient3
            ,includeing4:searchIncludeIngredient4
            ,includeing5:searchIncludeIngredient5
            ,discludeing1:searchDiscludeIngredient1
            ,discludeing2:searchDiscludeIngredient2
            ,discludeing3:searchDiscludeIngredient3
            ,discludeing4:searchDiscludeIngredient4
            ,discludeing5:searchDiscludeIngredient5
            ,mealtime:searchSelectedMealType
            ,healthrat:searchHealthRating
        }).then(resolvedValue => setSearchResults(resolvedValue.results));
    };
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
                        <select ref={includeIngredient1}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l12">
                        <select ref={includeIngredient2}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l13">
                        <select ref={includeIngredient3}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l14">
                        <select ref={includeIngredient4}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l15">
                        <select ref={includeIngredient5}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                </ol>
                <label id="lbl-inc-ing" for="inc-ing">Include Ingredients:</label>
            </div>
            <div class="disclude-ingredients">
                <ol id="dis-ing">
                    <li id="l21">
                        <select ref={discludeIngredient1}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l22">
                        <select ref={discludeIngredient2}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l23">
                        <select ref={discludeIngredient3}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l24">
                        <select ref={discludeIngredient4}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                    <li id="l25">
                        <select ref={discludeIngredient5}>
                            <option selected value={null}></option>
                            {
                                ingredients.map(
                                    (ingre) => 
                                        <option key={ingre[0]} value={ingre[0]}>{ingre[1]}</option>)
                            }
                        </select>
                    </li>
                </ol>
                <label id="lbl-dis-ing" for="dis-ing">Disclude Ingredients:</label>
            </div>
            <div class="meal-time">
                <ul id="meal">
                    {props.mealTypes.map((mealType) => 
                    <li>
                        <input checked={selectedMealType===mealType[0]} onChange={(event) => setSelectedMealType(mealType[0])} type="radio" id={mealType[1]} name="meal" value={mealType[0]}></input>
                        <label for={mealType[1]}>{mealType[1]}</label>
                        <br />
                    </li>)
                    }
                </ul>
                <label for="meal" id="lbl-meal">Meal Time:</label>
            </div>
            <div class="health-rating">
                <ul id="health-rat">
                    {//note to self the checked section may be unnecessary?
                    }
                    <input checked={healthRating===1} onChange={(event) => setHealthRating(1)} type="radio" id="one" name="rating" value="1" />
                    <label for="one">1</label>
                    <br />
                    <input checked={healthRating===2} onChange={(event) => setHealthRating(2)} type="radio" id="two" name="rating" value="2" />
                    <label for="two">2</label>
                    <br />
                    <input checked={healthRating===3} onChange={(event) => setHealthRating(3)} type="radio" id="three" name="rating" value="3" />
                    <label for="three">3</label>
                    <br />
                    <input checked={healthRating===4} onChange={(event) => setHealthRating(4)} type="radio" id="four" name="rating" value="4" />
                    <label for="four">4</label>
                    <br />
                    <input checked={healthRating===5} onChange={(event) => setHealthRating(5)} type="radio" id="five" name="rating" value="5" />
                    <label for="five">5</label>
                </ul>
                <label for="health-rat" id="lbl-health">Minimum Health Rating:</label>
            </div>
            <div class="keywords">
              <ol id="kw">
                  <li id="l31"><input ref={keyword1} type="text"/></li>
                  <li id="l32"><input ref={keyword2} type="text"/></li>
                  <li id="l33"><input ref={keyword3} type="text"/></li>
                  <li id="l34"><input ref={keyword4} type="text"/></li>
                  <li id="l35"><input ref={keyword5} type="text"/></li>
              </ol>
              <label for="kw" id="keyw">Keywords:</label>
            </div>
            <div class="prep-time">
                <label for="minimum" id="lbl-min">Minimum Amount of Preparation Time(Minutes):</label>
                <input ref={prepmin} type="number" name="minutes" id="minimum" step="1"></input>
                <label for="maximum" id= "lbl-max">Maximum Amount of Preparation Time(Minutes):</label>
                <input ref={prepmax} type="number" name="minutes" id="maximum" step="1"></input>
            </div>
        </div>
        <button onClick={onUserClickedSearch} class="search-btn">SEARCH</button>
        <div>
            <h3>
                Results:
            </h3>
            < SearchResults searchResults={searchResults}/>
        </div>
    </main>
    );
}

export default SearchPage;