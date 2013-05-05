module.exports = function (expected, element, cb) {
    for (var i = 0; i < expected.length; i++) {
        var a = fudge(element.innerHTML);
        var b = fudge(expected[i]);
        if (a === b || i === expected.length - 1) return cb(a, b);
    }
};

function fudge (html) {
    return html.toLowerCase()
        .replace(/\r\n/g, '\n')
        .replace(/"/g, '')
        .replace(/\n/g, '')
    ;
}
