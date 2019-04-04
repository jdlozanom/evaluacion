function accessor(obj, defaultValue, path) {
    let fun = function (path) {
        let state = obj;
        path.split('.').forEach(function (elem) {
            if (state) state = state[elem];
        });

        if (!state) return defaultValue;
        else return state;
    };

    if (!path) return fun;
    else return fun(path);
}