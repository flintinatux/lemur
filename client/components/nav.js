const h = require('snabbdom/h')

exports.view = (actions, model) =>
  h('nav', [
    h('a', {
      attrs: { href: '#/' }
    }, 'Home'),

    h('a', {
      attrs: { href: '#/items/abc' }
    }, 'ABC')
  ])
