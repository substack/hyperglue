module.exports = function (src, updates) {
    if (!updates) updates = {};
    
    var div = src;
    if (typeof div !== 'object') {
        div = document.createElement('div');
        div.innerHTML = src.replace(/^\s+|\s+$/g, '');
        if (div.childNodes.length === 1) {
            div = div.childNodes[0];
        }
    }
    
    forEach(objectKeys(updates), function (selector) {
        var value = updates[selector];
        var nodes = div.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            if (isElement(value)) {
                nodes[i].innerHTML = '';
                nodes[i].appendChild(value);
            }
            else if (value && typeof value === 'object') {
                forEach(objectKeys(value), function (key) {
                    if (key === '_text') {
                        setText(nodes[i], value[key]);
                    }
                    else if (key === '_html' && isElement(value[key])) {
                        nodes[i].innerHTML = '';
                        nodes[i].appendChild(value[key]);
                    }
                    else if (key === '_html') {
                        nodes[i].innerHTML = value[key];
                    }
                    else nodes[i].setAttribute(key, value[key]);
                });
            }
            else setText(nodes[i], value);
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

function isElement (e) {
    return e && typeof e === 'object' && e.childNodes
        && typeof e.appendChild === 'function'
    ;
}

function setText (e, s) {
    e.innerHTML = '';
    var txt = document.createTextNode(s);
    e.appendChild(txt);
}
