const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const h       = require('snabbdom/h')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const Type    = require('union-type')

const Cmd = require('../lib/cmd')

// Model

exports.init = K([ { face: 1 }, Cmd.none ])

// Update

const Msg = Type({
  Face: [ Number ],
  Roll: [ ]
})

const roll = _ => Math.ceil(Math.random() * 6)

exports.update = Msg.caseOn({
  Face: (face, model) => [ assoc('face', face, model), Cmd.none ],
  Roll: model => [ model, Cmd.sync(roll).map(Msg.Face) ]
})

// View

exports.view = (update, model) =>
  h(`div.${css.root}`, [
    h('style', css.toString()),

    h(`h1.${css.face}`, model.face),

    h(`button.${css.btn}`, {
      on: { click: [ update, Msg.Roll() ] }
    }, 'Roll')
  ])

// Styles

const spacing = '10px'

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '2px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: spacing,
    outline: 'none',
    padding: '8px 12px',

    '&:active': {
      background: '#eee'
    }
  },

  '.face': {
    margin: '0',
    padding: spacing,
    textAlign: 'center'
  },

  '.root': {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    width: '50px'
  }
})
