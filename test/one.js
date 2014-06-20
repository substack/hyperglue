var test = require('tape');
var hyperglue = require('../');

var html = '<img class="b"><img class="a b c"><img class="a c">';

test(':first', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, { 'img.b:first': { src: 'b.png' } }).outerHTML;
    t.equal(res, '<img class="b" src="b.png">'
        + '<img class="a b c">'
        + '<img class="a c">'
    );
});
