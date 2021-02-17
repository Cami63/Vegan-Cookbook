class ApiConnector {
    static getIngredients() {
        return fetch('http://localhost:5000/ingredients')
            .then(resp => resp.json());
    }
    static search(searchData) {
        return fetch('http://localhost:5000/search', {
            method:'post'
            ,headers:new Headers({
                'content-type':'application/json'
            })
            ,body: JSON.stringify(searchData)
        })
            .then(resp => resp.json());
    }
    /*
    static viewrecipe(recipeid) {
        return fetch('http://localhost:5000/recipe')
            .then(resp => resp.json());
    }
    */
    static addrecipe(addedData) {
        return fetch('http://localhost:5000/recipe', {
            method:'post'
            ,headers:new Headers({
                'content-type':'application/json'
            })
            ,body: JSON.stringify(addedData)
        })
            .then(resp => resp.json());
    }
    /*static getingredients() {
        return fetch('http:localhost:5000/ingredients', {
            method:'post'
            ,headers:new Headers({
                'content-type':'application/json'
            })
            ,body: JSON.stringify(addedData)
        })
            .then(resp => resp.json());
    }*/
    static getMealTypes() {
        return fetch('http://localhost:5000/meal_types')
            .then(resp => resp.json());
    }
    static viewRecipeSteps(recipeid) {
        return fetch(`http://localhost:5000/viewrecipesteps?recipeId=${recipeid}`)
            .then(resp => resp.json());
    }
    static viewRecipeIngredients(recipeid) {
        return fetch(`http://localhost:5000/viewrecipeingredients?recipeId=${recipeid}`)
            .then(resp => resp.json());
    }
    static viewRecipeMealTimes(recipeid) {
        return fetch(`http://localhost:5000/viewrecipemealtimes?recipeId=${recipeid}`)
            .then(resp => resp.json());
    }
}


export default ApiConnector;