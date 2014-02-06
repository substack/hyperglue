var domify = require('domify');

module.exports = hyperglue;
function hyperglue (src, updates) {
    if (!updates) updates = {};
    
    var ob = typeof src === 'object';
    var dom = ob
            ? [ src ]
            : domify("<div>"+src+"</div>");
    var returnDom = [];
    var html = "";

    forEach(objectKeys(updates), function (selector) {
        var value = updates[selector];
        if (selector === ':first') {
            bind(ob ? dom[0] : dom[0].firstChild, value);
        }
        else if (/:first$/.test(selector)) {
            var k = selector.replace(/:first$/, '');
            var elem = dom[0].querySelector(k);
            if (elem) bind(elem, value);
        }
        else{
            var nodes = dom[0].querySelectorAll(selector);
            if (nodes.length === 0) return;
            for (var i = 0; i < nodes.length; i++) {
                bind(nodes[i], value);
            }
        }
    });

    if( ob ){
        return dom.length === 1 ? dom[0] : dom;
    }else{
        if (dom[0].childElementCount === 1){
            returnDom = dom[0].removeChild(dom[0].firstChild);
        }else{
            returnDom.innerHTML = returnDom.outerHTML = "";

            while(dom[0].firstChild){
                returnDom.innerHTML += returnDom.outerHTML += dom[0].firstChild.outerHTML;
                returnDom.push(dom[0].removeChild(dom[0].firstChild));
            }            
        }
        returnDom.appendTo = appendTo;
        return returnDom;
    }
}

function bind (node, value) {
    if (isElement(value)) {
        node.innerHTML = '';
        node.appendChild(value);
    }
    else if (isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            var e = hyperglue(node.cloneNode(true), value[i]);
            node.parentNode.insertBefore(e, node);
        }
        node.parentNode.removeChild(node);
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
        && (typeof e.appendChild === 'function'
        || typeof e.appendChild === 'object')
    ;
}

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

function setText (e, s) {
    e.innerHTML = '';
    var txt = document.createTextNode(String(s));
    e.appendChild(txt);
}

function appendTo(dest) {
    forEach(this, function(src){ dest.appendChild( src ) } ); 
    return this;
}