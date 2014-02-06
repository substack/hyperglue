var hyperglue = require('../');
var test = require('tape');

test('rootElements', function (t) {
    t.plan(3);
    
    var res;

    //single root element, by class
    res = hyperglue('<div class="hello"></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div class="hello">world</div>');

    //single non-root element, by class
    res = hyperglue('<div><div class="hello"></div></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div><div class="hello">world</div></div>');

    //multiple root element, by class
    res = hyperglue('<div class="hello"></div><div class="hello"></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div class="hello">world</div><div class="hello">world</div>');


});
