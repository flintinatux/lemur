const tap = require('ramda/src/tap')

exports.error = tap(console.error.bind(console))

exports.log = tap(console.log.bind(console))
