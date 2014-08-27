var trumpet = require('trumpet');
var ent = require('ent');
var concat = require('concat-stream');

var keepalive = {end: false};

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

   function specialKeys (k) {
        var lk = k.toLowerCase();
        if ( lk === '_text'       || lk === '_html' ||
             lk === '_append'     || lk === '_prepend' ||
             lk === '_appendtext' || lk === '_prependtext' ||
             lk === '_appendhtml' || lk === '_prependhtml' ) {
            return false; }
        else return true;
    }

    function each (elem, val) {

        function setAttribute (k) {
            if (val[k] === undefined) {
                elem.removeAttribute(k);
            }
            else elem.setAttribute(k, val[k]);
        }

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
            Object.keys(val).filter(specialKeys).forEach(setAttribute);

            if (val._text) {
                elem.createWriteStream().end(ent.encode(val._text));
            }
            else if (val._html) {
                elem.createWriteStream().end(val._html);
            }
            else if (val._appendHtml) {
                var elemStream = elem.createStream();
                elemStream.pipe(elemStream, keepalive)
                elemStream.on('end', function(){
                    elemStream.end(val._appendHtml);
                });
            }
            else if (val._prependHtml) {
                var elemStream = elem.createStream();
                elemStream.write(val._prependHtml);
                elemStream.pipe(elemStream);
            }
            else if (val._append || val._appendText) {
                var value = val._append || val._appendText
                var elemStream = elem.createStream();
                elemStream.pipe(elemStream, keepalive)
                elemStream.on('end', function(){
                    elemStream.end(ent.encode(value));
                });
            }
            else if (val._prepend || val._prependText) {
                var value = val._prepend || val._prependText
                var elemStream = elem.createStream();
                elemStream.write(ent.encode(value));
                elemStream.pipe(elemStream);
            }
        }
    }
}
