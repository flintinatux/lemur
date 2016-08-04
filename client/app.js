const patch = require('snabbdom').init([
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

const app = require('./examples/04-random')

const perform = cmd => cmd.fork(update, update)

const render = _ => vnode = patch(vnode, app.view(update, model))

const update = msg => {
  [ model, cmd ] = app.update(msg, model)
  render()
  perform(cmd)
}

var [ model, cmd ] = app.init(),
    vnode = document.getElementById('root')

render()
perform(cmd)
