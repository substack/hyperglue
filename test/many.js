var test = require('tape');
var hyperglue = require('../');

var html = '<img class="b"><img class="a b c"><img class="a c">';

test('querySelectorAll', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, { 'img.b': { src: 'b.png' } }).innerHTML;
    t.equal(res, '<img class="b" src="b.png">'
        + '<img class="a b c" src="b.png">'
        + '<img class="a c">'
    );
});
