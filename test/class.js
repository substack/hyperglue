var test = require('tape');
var hyperglue = require('../');

var html = '<div class="x"><div class="a"></div></div>';

test('add attr', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, {
        '.x': { 'class': 'x y' },
        '.a': 'AAA'
    }).outerHTML;
    
    t.equal(res, '<div class="x y"><div class="a">AAA</div></div>');
});
