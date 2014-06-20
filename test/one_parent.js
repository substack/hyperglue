var test = require('tape');
var hyperglue = require('../');

var html = '<div><span>x</span><span>y</span></div><b></b>';
var expected = '<div class="z"><span>x</span><span>y</span></div><b></b>';

test(':first', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, { ':first': { 'class': 'z' } }).outerHTML;
    t.equal(res, expected);
});
