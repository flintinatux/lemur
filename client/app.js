const flip = require('ramda/src/flip')
const flyd = require('flyd')

const patch = require('snabbdom').init([
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

const app = require('./examples/01-buttons')

const msg   = flyd.stream(),
      model = flyd.scan(flip(app.update), app.init(), msg),
      root  = document.getElementById('root'),
      vnode = model.map(app.view(msg))

flyd.scan(patch, root, vnode)
