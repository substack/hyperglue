module.exports = function (src, updates) {
    var div = document.createElement('div');
    div.innerHTML = src.trim();
    if (div.childNodes.length === 1) {
        div = div.childNodes[0];
    }
    
    forEach(objectKeys(updates), function (selector) {
        var value = updates[selector];
        var nodes = div.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            if (typeof value === 'object') {
                forEach(objectKeys(value), function (key) {
                    if (key === '_text') {
                        nodes[i].textContent = value[key];
                    }
                    else if (key === '_html') {
                        nodes[i].innerHTML = value[key];
                    }
                    else nodes[i].setAttribute(key, value[key]);
                });
            }
            else nodes[i].textContent = value;
        }
    });
    
    return div;
};

function forEach(xs, f) {
    if (xs.forEach) return xs.forEach(f);
    for (var i = 0; i < xs.length; i++) f(xs[i], i)
}

var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};
