# htmlglue

*This repo maintains the NodeJS implementation of [hyperglue](http://github.com/substack/hyperglue) which was removed later from the original codebase*

update html elements by mapping query selectors to attributes, text, and
hypertext

This module works in both node and the browser.

# example

``` js
var htmlglue = require('htmlglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/article.html');

function createArticle (doc) {
    var name = doc.title.replace(/[^A-Za-z0-9]+/g,'_');
    return htmlglue(html, {
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

console.log(createArticle({
    file: 'grobot.markdown',
    author: 'James Halliday',
    date: 'Mon Dec 24 15:31:27 2012 -0800',
    title: 'robots are pretty great',
    commit: '81c62aa62b6770a2f6bdf6865d393daf05930b4a',
    body: '<h1>robots!</h1>\n\n<p>Pretty great basically.</p>'
}).innerHTML);

console.log(createArticle({
    file: 'test.markdown',
    author: 'James Halliday',
    date: 'Mon Dec 24 04:31:53 2012 -0800',
    title: 'testing title',
    commit: '2a516000d239bbfcf7cdbb4b5acf09486bdf9586',
    body: '<h1>title text</h1>\n\n<p>beep boop.</p>\n\n<p><em>rawr</em></p>'
}).innerHTML);
```

## arrays

You can also duplicate existing elements in order to render arrays of results:

``` js
var htmlglue = require('hyperglue');

var html = [
    '<div id="rows">',
    '<div class="row">',
    '<span class="name"></span>',
    '<span class="message"></span>',
    '</div>',
    '<b>ahoy!</b>',
    '</div>'
].join('\n');

console.log(htmlglue(html, {
    '.row': [
        { '.name': 'T-REX', '.message': 'RAWR' },
        { '.name': 'robot', '.message': 'beep boop' },
        { '.name': 'Dr X', '.message': 'mwahaha' }
    ]
}).outerHTML);
```

output:

``` html
<div id="rows">
<div class="row">
<span class="name">T-REX</span>
<span class="message">RAWR</span>
</div>
<div class="row">
<span class="name">robot</span>
<span class="message">beep boop</span>
</div>
<div class="row">
<span class="name">Dr X</span>
<span class="message">mwahaha</span>
</div>
<b>ahoy!</b>
</div>
```

# install

With [npm](https://npmjs.org) do:

```
npm install htmlglue
```

# license

MIT

# kudos

Inspried by [plates](https://npmjs.org/package/plates).
