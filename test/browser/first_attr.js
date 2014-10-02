var test = require('tape');

var hyperglue = require('../../');
var html = '<a class="link">beep boop</a>';

test(function (t) {
    t.plan(1);
    
    var elem = hyperglue(html, {
        '.link': { href: '/robot' }
    });
    t.equal(elem.getAttribute('href'), '/robot');
});
