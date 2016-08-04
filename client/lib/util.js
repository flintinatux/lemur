const tap = require('ramda/src/tap')

exports.error = tap(console.error.bind(console))

exports.fork = (onReject, onResolve) => cmd => cmd.fork(onReject, onResolve)

exports.log = tap(console.log.bind(console))
