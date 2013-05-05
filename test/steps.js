void function(root){
    'use strict'
    var hyperglue = require('../')
        , test = require('tape')

    test(function (t) {
        t.plan(4)
        t.equal(hyperglue('<div></div>',{'div':{_text:'foobar'}}).outerHTML
                , hyperglue('<div>foobar</div>').outerHTML)
        t.equal(hyperglue('<div><p></p></div>',{'div':{_text:'foobar'}}).outerHTML
                , hyperglue('<div>foobar</div>').outerHTML)
        t.equal(hyperglue('<div><span><b></b></span></div>',{'div span':{_text:'foobar'}}).outerHTML
                , hyperglue('<div><span>foobar</span></div>').outerHTML)
        t.equal(hyperglue('<div><p></p></div>',{'div p':{_text:'foobar'}}).outerHTML
                , hyperglue('<div><p>foobar</p></div>').outerHTML)
    })

}(this)
