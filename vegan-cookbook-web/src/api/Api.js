class Api {
    static getIngredients() {
        return new Promise((resolve, reject) => {
                resolve([
                {
                    id: 1,
                    name: 'Potato'
                },
                {
                    id: 2,
                    name: 'Carrot'
                },
                {
                    id: 3,
                    name: 'Oil'
                },
                {
                    id: 4,
                    name: 'Apple'
                },
                {
                    id: 5,
                    name: 'Watermelon'
                },
            ])
        });
    }
}

export default Api;