var hyperglue = require('../../');
var test = require('tape');

test('rootElements', function (t) {
    t.plan(7);
    
    var res, div;

    //single root element, by class
    res = hyperglue('<div class="hello"></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div class="hello">world</div>');

    //single non-root element, by class
    res = hyperglue('<div><div class="hello"></div></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div><div class="hello">world</div></div>');

    //multiple root element, by class
    res = hyperglue('<div class="hello"></div><div class="hello"></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div class="hello">world</div><div class="hello">world</div>');

    //multiple root element, by class, check array
    res = hyperglue('<div class="hello"></div><div class="hello"></div>', { '.hello': 'world' })[1].outerHTML;
    t.equal(res, '<div class="hello">world</div>');

    //multiple non-root element, by class
    res = hyperglue('<div><div class="hello"></div><div class="hello"></div></div>', { '.hello': 'world' }).outerHTML;
    t.equal(res, '<div><div class="hello">world</div><div class="hello">world</div></div>');

    //single root element, by class, appendTo
    div = document.createElement("div");
    hyperglue('<span class="hello"></span>', { '.hello': 'world' }).appendTo(div);
    res = div.outerHTML;
    t.equal(res, '<div><span class="hello">world</span></div>');

    //multiple root element, by class, appendTo
    div = document.createElement("div");
    hyperglue('<span class="hello"></span><span class="hello"></span>', { '.hello': 'world' }).appendTo(div);
    res = div.outerHTML;
    t.equal(res, '<div><span class="hello">world</span><span class="hello">world</span></div>');

});
