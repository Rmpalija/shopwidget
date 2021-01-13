const API = {

    // Local http://localhost:8000/api
    // Dev   https://dev.shoppingcart.services/api
    // Prod  https://api.shoppingcart.services/api
    _REQUEST_URL : process.env.NODE_ENV === "production" ? "https://api.shoppingcart.services/api" : "https://dev.shoppingcart.services/api",
    _UUID: null,

   async shopRequest (url, params) {
        const requestURL = new URL(`${this._REQUEST_URL}/shop/${this._UUID}/${url}`)

       if(params?.getParams) {
           requestURL.search = new URLSearchParams(params.getParams).toString();
       }

        const responseJSON = await fetch(requestURL.toString(), {
            ...params,
            mode : "cors",
            headers: {
                ...params?.headers,
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Accept": 'application/json'
            }
        });
        const response = await responseJSON.json();
        return response.data;
    },
    async request (url, params) {
        const responseJSON = await fetch(`${this._REQUEST_URL}/${url}`, {
            ...params,
            mode : "cors",
            headers: {
                ...params?.headers,
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Accept": 'application/json'
            }
        });
        const response = await responseJSON.json();
        return response.data;
    }
}

export default API;
