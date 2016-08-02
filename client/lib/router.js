const compose   = require('ramda/src/compose')
const flyd      = require('flyd')
const h         = require('snabbdom/h')
const K         = require('ramda/src/always')
const merge     = require('ramda/src/merge')
const pathToReg = require('path-to-regexp')
const Type      = require('union-type')

const { hasOwnProperty } = Object.prototype

const hash = e => location.hash,
      url  = flyd.stream(hash())

window.addEventListener('hashchange', compose(url, hash))

const Action = Type({
  RouteChange: [Object]
})

exports.init = K({
  page:  null,
  state: {}
})

exports.route = (initial, routes={}) =>
  flyd.combine(url => {
    const path = url()

    if (!path) {
      location.hash = initial
      return
    }

    for (var route in routes) {
      var keys = [],
          re = pathToReg(route, keys),
          m  = re.exec(path),
          params = {}

      if (m) {
        for (var i = 1; i < m.length; i++) {
          var key  = keys[i - 1],
              prop = key.name,
              val  = decodeURIComponent(m[i])

          if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
            params[prop] = val
          }
        }

        const page = routes[route]

        return Action.RouteChange({
          page,
          state: merge(page.init(), { path, params })
        })
      }
    }

    console.error('Route not found: %s', path)
  }, [url])

exports.update = Action.caseOn({
  RouteChange: (state, model) => state
})

exports.view = actions => model =>
  model.page ? model.page.view(actions, model.state) : h('body')

/* USAGE:

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

*/
