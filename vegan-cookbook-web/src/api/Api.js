class ApiConnector {
    static getIngredients() {
        return fetch('http://localhost:5000/ingredients')
            .then(resp => resp.json());
    }
    static search(searchData) {
        return fetch('http://localhost:5000/search')
            .then(resp => resp.json());
    }
}

export default ApiConnector;