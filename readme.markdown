# hyperglue

update html elements in the browser by mapping query selectors to attributes,
text, and hypertext

[![browser support](http://ci.testling.com/substack/hyperglue.png)](http://ci.testling.com/substack/hyperglue)

[![build status](https://secure.travis-ci.org/substack/hyperglue.png)](http://travis-ci.org/substack/hyperglue)

In node, use [hyperstream](https://npmjs.org/package/hyperstream)
or [html-template](https://npmjs.org/package/html-template) to use the same
object properties.

# example

## in the browser

``` js
var hyperglue = require('hyperglue');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/article.html');

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

document.body.appendChild(createArticle({
    file: 'grobot.markdown',
    author: 'James Halliday',
    date: 'Mon Dec 24 15:31:27 2012 -0800',
    title: 'robots are pretty great',
    commit: '81c62aa62b6770a2f6bdf6865d393daf05930b4a',
    body: '<h1>robots!</h1>\n\n<p>Pretty great basically.</p>'
}));

document.body.appendChild(createArticle({
    file: 'test.markdown',
    author: 'James Halliday',
    date: 'Mon Dec 24 04:31:53 2012 -0800',
    title: 'testing title',
    commit: '2a516000d239bbfcf7cdbb4b5acf09486bdf9586',
    body: '<h1>title text</h1>\n\n<p>beep boop.</p>\n\n<p><em>rawr</em></p>'
}));
```

Compile this code with [browserify](http://browserify.org) and
[brfs](http://github.com/substack/brfs):

```
$ npm install -g browserify; npm install brfs
$ browserify -t brfs browser.js > bundle.js
```

Then just do:

``` html
<script src="bundle.js"></script>
```

## arrays

You can also duplicate existing elements in order to render arrays of results:

``` js
var hyperglue = require('hyperglue');

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

# methods

``` js
var hyperglue = require('hyperglue')
```

## hyperglue(src, updates)

Return an html element from the source string or element `src` with `updates`
applied to it.
In the browser you get a complete html element. In node you get an object with
an `innerHTML` property populated with the string contents of the replacement.

`updates` should have [query selectors](http://www.w3.org/TR/CSS2/selector.html)
as keys and target strings, numbers, or objects as values.

Each `update` query selector can have the special pseudo-class `:first` which
causes the selector to only match the first value like `querySelector()` instead
of all the matching elements like `querySelectorAll()`, the default.

If the target values in `updates` are strings or numbers, set the inner text
content of the matching elements to that value.

When the target values are html elements, replace the inner content at the
selected element with a clone of the value.

For target values of arrays, recursively apply `hyperglue(node.cloneNode(),
value)` for each matching element in the array and then remove the original
node. This feature makes rendering arrays of content super simple.

If the target values in `updates` are non-html element objects, update the
attributes on all matching elements with the keys in the target values. Use
`'_text'` to set the text content and `'_html'` to set the innerHTML in object
form. If `'_html'` is an HTML element, replace the inner content at the
selector elements with a clone of the `'_html'` value.

Instead of a text value for an attribute, you can also specify an object with
`append` and `prepend` keys to append or prepend strings.

# install

With [npm](https://npmjs.org) do:

```
npm install hyperglue
```

# license

MIT

# kudos

Inspried by [plates](https://npmjs.org/package/plates).
