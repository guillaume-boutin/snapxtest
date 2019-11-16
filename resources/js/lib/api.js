export default (routeName, payload = null) => {
    let route = API_ROUTES.find((ar) => {
        return ar.name === routeName;
    });

    let method = route.method.toLowerCase();

    let path = route.path;
    route.params.forEach(param => {
        path = path.replace("{"+param+"}", payload[param]);
        delete payload[param]
    });

    return axios[method](path, payload);
};