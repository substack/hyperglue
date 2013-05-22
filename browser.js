var domify = require('domify');
var query = require('queryselector');

module.exports = function (src, updates) {
    if (!updates) updates = {};

    var dom = typeof dom === 'object'
        ? src
        : domify(src)
    ;

    forEach(objectKeys(updates), function (selector) {
        var value = updates[selector];
        forEach(dom, function (d) {
            var nodes = query.all(d, selector);
            if (nodes.length === 0) return;
            for (var i = 0; i < nodes.length; i++) {
                bind(nodes[i], value);
            }
        });
    });

    return dom.length === 1
        ? dom[0]
        : dom
    ;
};

function bind(node, value) {
    if (isElement(value)) {
        node.innerHTML = '';
        node.appendChild(value);
    }
    else if (value && typeof value === 'object') {
        forEach(objectKeys(value), function (key) {
            if (key === '_text') {
                setText(node, value[key]);
            }
            else if (key === '_html' && isElement(value[key])) {
                node.innerHTML = '';
                node.appendChild(value[key]);
            }
            else if (key === '_html') {
                node.innerHTML = value[key];
            }
            else node.setAttribute(key, value[key]);
        });
    }
    else setText(node, value);
}

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
        || typeof e.appendChild === 'object'
    ;
}

function setText (e, s) {
    e.innerHTML = '';
    var txt = document.createTextNode(s);
    e.appendChild(txt);
}
