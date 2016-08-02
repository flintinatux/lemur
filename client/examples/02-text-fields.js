const compose = require('ramda/src/compose')
const h       = require('snabbdom/h')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const merge   = require('ramda/src/merge')
const reverse = require('ramda/src/reverse')
const Type    = require('union-type')

// Styles

const spacing = '10px'

const css = j2c.sheet({
  '.arrow': {
    marginRight: spacing,
  },

  '.container': {
    alignItems: 'center',
    display: 'flex',
    padding: spacing
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '2px',
    marginRight: spacing,
    outline: 'none',
    padding: '8px 12px',
    width: '200px'
  }
})

// Model

const Model = Object

exports.init = K({
  content: ''
})

// Update

const Msg = Type({
  Change: [String]
})

exports.update = Msg.caseOn({
  Change: (content, model) => merge(model, { content })
})

// View

const targetValue = e => e.target.value

exports.view = update => model =>
  h(`div.${css.container}`, [
    h('style', css.toString()),

    h(`input.${css.input}`, {
      attrs: {
        autofocus: true,
        placeholder: 'Text to reverse'
      },
      on: { input: compose(update, Msg.Change, targetValue) }
    }),

    h(`span.${css.arrow}`, '<=>'),

    h(`input.${css.input}`, {
      attrs: {
        disabled: true,
        placeholder: 'Reversed result',
        value: reverse(model.content)
      }
    })
  ])
