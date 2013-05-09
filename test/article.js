var test = require('tape');

var hyperglue = require('../');
var html = require('./article/html');
var expected = require('./article/expected');
var compare = require('./article/compare');

function createArticle (doc) {
    var name = doc.title.replace(/[^A-Za-z0-9]+/g,'_');
    return hyperglue(html, {
        '.title a': {
            name: name,
            href: '#' + name,
            _text: doc.title
        },
        '.commit': doc.commit,
        '.author': doc.author,
        '.date': doc.date,
        '.body': { _html: doc.body }
    });
}

test(function (t) {
    t.plan(1);
    
    var src = '';
    
    src += createArticle({
        file: 'grobot.markdown',
        author: 'James Halliday',
        date: 'Mon Dec 24 15:31:27 2012 -0800',
        title: 'robots are pretty great',
        commit: '81c62aa62b6770a2f6bdf6865d393daf05930b4a',
        body: '<h1>robots!</h1>\n\n<p>Pretty great basically.</p>'
    }).innerHTML;
    
    src += createArticle({
        file: 'test.markdown',
        author: 'James Halliday',
        date: 'Mon Dec 24 04:31:53 2012 -0800',
        title: 'testing title',
        commit: '2a516000d239bbfcf7cdbb4b5acf09486bdf9586',
        body: '<h1>title text</h1>\n\n<p>beep boop.</p>\n\n<p><em>rawr</em></p>'
    }).innerHTML;
    
    compare(expected, { innerHTML: src }, function (a, b) {
        t.equal(a, b);
    });
});
