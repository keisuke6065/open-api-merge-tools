exports.merge = merge;

function merge(target, bundles) {
    if (Array.isArray(target)) {
        return target.map(it => merge(it, bundles));
    } else if (typeof target === 'object') {
        let result = {};
        Object.keys(target).forEach(key => {
            if (key === "$ref" && !target[key].startsWith("#")) {
                const nested = bundles[target[key]];
                Object.keys(nested).forEach(key => {
                    result[key] = nested[key];
                });
            } else {
                result[key] = merge(target[key], bundles);
            }
        });
        return result;
    } else {
        return target;
    }
}
