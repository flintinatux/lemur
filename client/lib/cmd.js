const Cmd = require('data.task')
const control = require('control.async/lib/core')(Cmd)

Cmd.async = fn => new Cmd(fn)

Cmd.batch = control.parallel

Cmd.none = Cmd.empty()

Cmd.sync = fn => new Cmd((rej, res) => res(fn()))

module.exports = Cmd
