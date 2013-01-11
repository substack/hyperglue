# hyperglue

update html elements by mapping query selectors to attributes, text, and
hypertext

[![browser support](http://ci.testling.com/substack/hyperglue.png)](http://ci.testling.com/substack/hyperglue)

# example

``` js
var hyperglue = require('hyperglue');
var html = require('./html');

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

# methods

``` js
var hyperglue = require('hyperglue')
```

## hyperglue(src, updates)

Return an html element from the source string or element `src` with `updates`
applied to it. `updates` should have
[query selectors](http://www.w3.org/TR/CSS2/selector.html)
as keys and target strings, numbers, or objects as values.

If the target values in `updates` are strings or numbers, set the inner text
content of the matching elements to that value.

When the target values are html elements, replace the inner content at the
selected element with a clone of the value.

If the target values in `updates` are non-html element objects, update the
attributes on all matching elements with the keys in the target values. Use
`'_text'` to set the text content and `'_html'` to set the innerHTML in object
form. If `'_html'`` is an HTML element, replace the inner content at the
selector elements with a clone of the `'_html'` value.

# install

With [npm](https://npmjs.org) do:

```
npm install hyperglue
```

# license

MIT

# kudos

Inspried by [plates](https://npmjs.org/package/plates).
