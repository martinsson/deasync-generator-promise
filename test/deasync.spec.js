"use strict";

let assert = require('assert')
let deasync = require('../index')
describe('deasyncGenerator', function () {

    it('synchronously returns the (first) result of the generator function', function () {
        let syncGreetingFunction = deasync.deasyncGenerator(function*() {
            return yield Promise.resolve("hello")
        })
        let greeting = syncGreetingFunction()
        assert.equal(greeting, 'hello')
    })


    it('synchronously returns the result of the promise', function () {
        let syncGreetingFunction = deasync.deasyncPromise(() => Promise.resolve("hello"))
        let greeting = syncGreetingFunction()
        assert.equal(greeting, 'hello')
    })

})