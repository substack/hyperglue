var test = require('tape');
var hyperglue = require('../');

var html = [
    '<div id="rows">',
    '<div class="row">',
    '<span class="name"></span>',
    '<span class="message"></span>',
    '</div>',
    '<b>ahoy!</b>',
    '</div>'
].join('\n');

var expected = [
    '<div id="rows">',
    '<div class="row">',
    '<span class="name">T-REX</span>',
    '<span class="message">RAWR</span>',
    '</div><div class="row">',
    '<span class="name">robot</span>',
    '<span class="message">beep boop</span>',
    '</div><div class="row">',
    '<span class="name">Dr X</span>',
    '<span class="message">mwahaha</span>',
    '</div>',
    '<b>ahoy!</b>',
    '</div>'
].join('\n');

test('array', function (t) {
    t.plan(1);
    
    var res = hyperglue(html, {
        '.row': [
            { '.name': 'T-REX', '.message': 'RAWR' },
            { '.name': 'robot', '.message': 'beep boop' },
            { '.name': 'Dr X', '.message': 'mwahaha' }
        ]
    }).outerHTML;
    
    t.equal(res, expected);
});
