// const compose = require('ramda/src/compose')
const flip = require('ramda/src/flip')
const flyd = require('flyd')
const h    = require('snabbdom/h')
// const T    = require('ramda/src/T')
const Type = require('union-type')

const patch = require('snabbdom').init([
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

const route = require('./lib/route')

const Action = Type({
  Click: []
})

const update = Action.caseOn({
  Click: model => model + 1
})

const actions = flyd.stream(Action.Click()),
      model   = flyd.scan(flip(update), -1, actions)

const nav = actions => model =>
  h('nav', [
    h('a', {
      attrs: { href: '#/' },
      on: { click: [actions, Action.Click()] }
    }, 'Home'),

    h('a', {
      attrs: { href: '#/items/abc' },
      on: { click: [actions, Action.Click()] }
    }, 'ABC')
  ])

const Home = params => actions => model =>
  h('body', [
    nav(actions)(model),
    h('h1', 'Home'),
    h('p', `Clicks: ${model}`)
  ])

const Item = params => actions => model =>
  h('body', [
    nav(actions)(model),
    h('h1', `Item ${params.id.toUpperCase()}`),
    h('p', `Clicks: ${model}`)
  ])

const view = route('/', {
  '/':          Home,
  '/items/:id': Item
})

const vnode = view.map(v => v(actions)).ap(model)

flyd.scan(patch, document.body, vnode)
