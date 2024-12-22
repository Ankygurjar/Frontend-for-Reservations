const apiService = {
    getService: (endpoint):Promise<Response> => {
        return fetch(endpoint)
            .then((response) => {
                return response.json();
            })
            .catch(err => {
                console.error(err);
                throw err;
            })
    }
}

export {apiService};
