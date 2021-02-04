class Api {
    static getIngredients() {
        return fetch('http://localhost:5000/ingredients')
            .then(resp => resp.json());
    }
}

export default Api;