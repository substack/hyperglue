var trumpet = require('trumpet');
var ent = require('ent');
var concat = require('concat-stream');

module.exports = function (html, params) {
    var tr = trumpet();
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        
        tr.select(key, function (node) {
            if (!val) return;
            
            if (Array.isArray(val)) {
                // ...
            }
            else node.update.apply(node, makeUpdate(node, val));
        });
    });
    
    
    var body = '';
    tr.pipe(concat(function (err, src) { body = src }));
    tr.end(html);
    return {
        outerHTML: body,
        innerHTML: body
    };
};

function makeUpdate (node, val) {
    if (typeof val === 'object') {
        var copy = shallowCopy(val);
        Object.keys(node.attributes).forEach(function (key) {
            if (val[key] === undefined) {
                copy[key] = node.attributes[key];
            }
        });
        Object.keys(copy).forEach(function (key) {
            if (copy[key] === undefined || copy[key] === null) {
                delete copy[key];
            }
        });
    }
    
    if (typeof val === 'object' && val._html !== undefined) {
        delete copy._html;
        return [
            function (html) { return val._html },
            Object.keys(copy).length ? copy : undefined
        ];
    }
    else if (typeof val === 'object' && val._text !== undefined) {
        delete copy._text;
        return [
            ent.encode(String(val._text)),
            Object.keys(copy).length ? copy : undefined
        ];
    }
    else if (typeof val === 'object') {
        return [ String, copy ];
    }
    else {
        return [ ent.encode(String(val)) ];
    }
}

function shallowCopy (obj) {
    var res = {};
    Object.keys(obj).forEach(function (key) {
        res[key] = obj[key];
    });
    return res;
}
