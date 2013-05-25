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

console.log(hyperglue(html, {
    '.row': [
        { '.name': 'T-REX', '.message': 'RAWR' },
        { '.name': 'robot', '.message': 'beep boop' },
        { '.name': 'Dr X', '.message': 'mwahaha' }
    ]
}).outerHTML);
