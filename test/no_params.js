var test = require('tap').test;
var hyperglue = require('../');

test('no params', function (t) {
    t.plan(1);
    t.equal(hyperglue('<p></p>').innerHTML, '<p></p>');
});
