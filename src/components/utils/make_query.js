

const make_query = resourceUri => {
    let url = `http://localhost:8000${resourceUri}`;
    return fetch(url).then(response => response.json());
}

export default make_query;