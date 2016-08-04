const dec  = require('ramda/src/dec')
const h    = require('snabbdom/h')
const inc  = require('ramda/src/inc')
const j2c  = require('j2c')
const K    = require('ramda/src/always')
const Type = require('union-type')

// Model

const Model = Number

exports.init = K(0)

// Update

const Msg = Type({
  Decrement: [],
  Increment: [],
  Reset: []
})

exports.update = Msg.caseOn({
  Decrement: dec,
  Increment: inc,
  Reset: K(0)
})

// View

exports.view = update => model =>
  h(`div.${css.container}`, [
    h('style', css.toString()),

    h(`button.${css.btn}`, {
      on: { click: [update, Msg.Reset()] },
    }, 'Reset'),

    h(`button.${css.btn}`, {
      on: { click: [update, Msg.Decrement()] },
    }, '-'),

    h(`input.${css.input}`, {
      attrs: { disabled: true, value: model }
    }),

    h(`button.${css.btn}`, {
      on: { click: [update, Msg.Increment()] },
    }, '+')
  ])

// Styles

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '2px',
    cursor: 'pointer',
    marginRight: '10px',
    outline: 'none',

    '&:active': {
      background: '#eee'
    }
  },

  '.container': {
    display: 'flex',
    padding: '10px'
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '2px',
    marginRight: '10px',
    outline: 'none',
    textAlign: 'center',
    width: '50px'
  }
})
