export default (routeName, payload = {}) => {
    let route = API_ROUTES.find((ar) => {
        return ar.name === routeName;
    });

    let method = route.method.toLowerCase();

    let path = route.path;
    route.params.every(param => {
        if (path.search("{"+param+"}") === -1) return true;

        path = path.replace("{"+param+"}", payload[param]);
        delete payload[param]

        return true
    });

    if (method === 'get') {
        payload = { params: payload };
    }

    return axios[method](path, payload);
};