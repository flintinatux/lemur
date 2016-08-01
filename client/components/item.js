const h = require('snabbdom/h')
const I = require('ramda/src/identity')
const K = require('ramda/src/always')

const nav = require('./nav')

exports.init = K({})

exports.update = I

exports.view = (actions, model) =>
  h('body', [
    nav.view(actions, model),
    h('h1', `Item ${model.params.id.toUpperCase()}`)
  ])
