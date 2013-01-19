var html = [
'<div class="article">',
'<div class="title">',
[
  '<a name="robots_are_pretty_great" href="#robots_are_pretty_great">robots are pretty great</a>',
  '<a href="#robots_are_pretty_great" name="robots_are_pretty_great">robots are pretty great</a>'
],
'</div>',
'<div class="inner">',
'<div class="headers">',
'<div class="header">',
'<div class="key">commit</div>',
'<div class="value commit">81c62aa62b6770a2f6bdf6865d393daf05930b4a</div>',
'</div>',
'<div class="header">',
'<div class="key">Author:</div>',
'<div class="value author">James Halliday</div>',
'</div>',
'<div class="header">',
'<div class="key">Date:</div>',
'<div class="value date">Mon Dec 24 15:31:27 2012 -0800</div>',
'</div>',
'</div>',
'<div class="body"><h1>robots!</h1>',
'',
'<p>Pretty great basically.</p></div>',
'</div>',
'</div><div class="article">',
'<div class="title">',
[
  '<a name="testing_title" href="#testing_title">testing title</a>',
  '<a href="#testing_title" name="testing_title">testing title</a>'
],
'</div>',
'<div class="inner">',
'<div class="headers">',
'<div class="header">',
'<div class="key">commit</div>',
'<div class="value commit">2a516000d239bbfcf7cdbb4b5acf09486bdf9586</div>',
'</div>',
'<div class="header">',
'<div class="key">Author:</div>',
'<div class="value author">James Halliday</div>',
'</div>',
'<div class="header">',
'<div class="key">Date:</div>',
'<div class="value date">Mon Dec 24 04:31:53 2012 -0800</div>',
'</div>',
'</div>',
'<div class="body"><h1>title text</h1>',
'',
'<p>beep boop.</p>',
'',
'<p><em>rawr</em></p></div>',
'</div>',
'</div>'
];

module.exports = (function concatenate (xs) {
    var variants = [ [] ];
    var strings = [ null ];
    
    for (var i = 0; i < xs.length; i++) {
        var line = xs[i];
        if (isArray(line)) {
            for (var j = 1; j < line.length; j++) {
                var xs_ = variants[0].concat(line[j], xs.slice(i+1));
                strings.push.apply(strings, concatenate(xs_));
            }
            line = line[0];
        }
        variants[0].push(line);
    }
    
    strings[0] = variants[0].join('\n');
    return strings;
})(html);

function isArray (xs) {
    if (Array.isArray) return Array.isArray(xs);
    return Object.prototype.toString.call(xs) === '[object Array]';
}
