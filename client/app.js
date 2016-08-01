const flip = require('ramda/src/flip')
const flyd = require('flyd')

const patch = require('snabbdom').init([
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

const Home   = require('./components/home')
const Item   = require('./components/item')
const router = require('./lib/router')

const actions = flyd.stream(),
      model   = flyd.scan(flip(router.update), router.init(), actions)

const route = router.route('/', {
  '#/': Home,
  '#/items/:id': Item
})

route.map(actions)
const vnode = model.map(router.view(actions))

flyd.scan(patch, document.body, vnode)
