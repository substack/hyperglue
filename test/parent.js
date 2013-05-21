var test = require('tape');
var hyperglue = require('../');

test(function (t) {
    t.plan(4);
    t.equal(
        hyperglue('<div></div>',{'div':{_text:'foobar'}}).outerHTML,
        hyperglue('<div>foobar</div>').outerHTML
    );
    t.equal(
        hyperglue('<div><p></p></div>', {'div':{_text:'foobar'}}).outerHTML,
        hyperglue('<div>foobar</div>').outerHTML
    );
    t.equal(
        hyperglue(
            '<div><div><p></p></div></div>',
            {'div':{_text:'foobar'}}
        ).outerHTML,
        hyperglue('<div><div>foobar</div></div>').outerHTML
    );
    t.equal(
        hyperglue('<div><p></p></div>',{'div p':{_text:'foobar'}}).outerHTML,
        hyperglue('<div><p>foobar</p></div>').outerHTML
    );
});
