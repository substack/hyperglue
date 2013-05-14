var test = require('tap').test;
var hyperglue = require('../');

var html = '<img class="a">';

test('attr', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, { 'img.a': { src: '/a.png' } }).innerHTML;
    
    t.ok(
        res === '<img class="a" src="/a.png">'
        || res === '<img src="/a.png" class="a">',
        'has both class and src: ' + res
    );
});
