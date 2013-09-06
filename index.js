var trumpet = require('trumpet');
var ent = require('ent');
var concat = require('concat-stream');

module.exports = hyperglue;
function hyperglue (html, params) {
    var tr = trumpet();
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        if (!val) return;
        if (typeof val === 'string') val = { _text: val };
        else if (Buffer.isBuffer(val)) val = { _text: val.toString('utf8') };
        else if (typeof val !== 'object') val = { _text: String(val) };
        
        if (Buffer.isBuffer(val._text)) val._text = val._text.toString('utf8');
        
        if (key === ':first') {
            each(tr.select('*'), val);
        }
        else if (/:first$/.test(key)) {
            var k = key.replace(/:first$/, '');
            each(tr.select(k), val);
        }
        else {
            tr.selectAll(key, function (elem) {
                each(elem, val);
            });
        }
    });
    
    var body = '';
    tr.pipe(concat(function (src) {
        body = (src || '').toString('utf8');
    }));
    tr.end(html);
    return {
        outerHTML: body,
        innerHTML: body
    };
    
    function each (elem, val) {
        if (Array.isArray(val)) {
            var s = elem.createStream({ outer: true });
            s.pipe(concat(function (body) {
                val.forEach(function (x) {
                    s.write(hyperglue(body, x).outerHTML);
                });
                s.end();
            }));
        }
        else {
            Object.keys(val).forEach(function (k) {
                if (k === '_text' || k === '_html') return;
                if (val[k] === undefined) {
                    elem.removeAttribute(k);
                }
                else elem.setAttribute(k, val[k]);
            });
            if (val._text) {
                elem.createWriteStream().end(ent.encode(val._text));
            }
            else if (val._html) {
                elem.createWriteStream().end(val._html);
            }
        }
    }
}
