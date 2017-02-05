"use strict";

var deasync = require('deasync');
var co = require('co')

// WARNING: fct should not return undefined, everything else accepted
function deasyncPromise(fct) {
    return function () {
        var _ret, _err;
        fct.apply(this, arguments).then(function (res) {
            _ret = res;
        }).catch(function (err) {
            _err = err;
        });
        while (_ret === undefined && _err === undefined) {
            deasync.runLoopOnce();
        }
        if (_ret !== undefined) {
            return _ret;
        }
        throw _err || new Error('Error will deasync promise');
    };
};

/**
 * Ex: let syncGreetingFunction = deasync.deasyncGenerator(function*() {
            return yield Promise.resolve("hello")
        })
 * @param generatorFunction
 * @returns {Function}
 */

function deasyncGenerator(generatorFunction) {
    return deasyncPromise(function () {
        return co(generatorFunction);
    });
};

module.exports = {
    deasync: deasync,
    deasyncPromise: deasyncPromise,
    deasyncGenerator: deasyncGenerator}
