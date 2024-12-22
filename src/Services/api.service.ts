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
    },
    postService: (endpoint, data): Promise<Response> => {
        return fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({data})
            })
            .then((response)=> response.json())
            .catch((err) => err);
    }
}

export {apiService};