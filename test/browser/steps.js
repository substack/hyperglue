var hyperglue = require('../../');
var test = require('tape');

test(function (t) {
    t.plan(4)
    t.equal(
        hyperglue('<div></div>',{':first':{_text:'foobar'}}).outerHTML,
        '<div>foobar</div>'
    );
    t.equal(
        hyperglue('<div><p></p></div>',{':first':{_text:'foobar'}}).outerHTML,
        '<div>foobar</div>'
    );
    t.equal(
        hyperglue(
            '<div><span><b></b></span></div>',
            {'div span':{_text:'foobar'}}
        ).outerHTML,
        '<div><span>foobar</span></div>'
    );
    t.equal(
        hyperglue('<div><p></p></div>',{'div p':{_text:'foobar'}}).outerHTML,
        '<div><p>foobar</p></div>'
    );
});
