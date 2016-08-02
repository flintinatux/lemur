const assoc   = require('ramda/src/assoc')
const compose = require('ramda/src/compose')
const h       = require('snabbdom/h')
const j2c     = require('j2c')
const K       = require('ramda/src/always')
const merge   = require('ramda/src/merge')
const Type    = require('union-type')

// Styles

const spacing = '10px'

const css = j2c.sheet({
  '.btn': {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '2px',
    cursor: 'pointer',
    marginBottom: spacing,
    outline: 'none',
    width: '100px',

    '&:active': {
      background: '#eee'
    }
  },

  '.container': {
    alignItems: 'left',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing
  },

  '.input': {
    border: '1px solid #ccc',
    borderRadius: '2px',
    marginBottom: spacing,
    outline: 'none',
    padding: '8px 12px',
    width: '200px'
  }
})

// Model

exports.init = K({
  age:       0,
  confirm:  '',
  name:     '',
  password: '',
  validate: false
})

// Update

const Msg = Type({
  Age:      [Number],
  Confirm:  [String],
  Name:     [String],
  Password: [String],
  Validate: []
})

exports.update = Msg.caseOn({
  Age:      assoc('age'),
  Confirm:  assoc('confirm'),
  Name:     assoc('name'),
  Password: assoc('password'),
  Validate: assoc('validate', true)
})

// View

const preventDefault = e => e.preventDefault()

const value = e => e.target.value

exports.view = update => model =>
  h(`form.${css.container}`, {
    on: { submit: compose(update, K(Msg.Validate()), preventDefault) }
  }, [
    h('style', css.toString()),

    h(`input.${css.input}`, {
      attrs: {
        type: 'text',
        placeholder: 'Name'
      },
      on: { input: compose(update, Msg.Name, value) }
    }),

    h(`input.${css.input}`, {
      attrs: {
        type: 'number',
        placeholder: 'Age'
      },
      on: { input: compose(update, Msg.Age, parseInt, value) }
    }),

    h(`input.${css.input}`, {
      attrs: {
        type: 'password',
        placeholder: 'Password'
      },
      on: { input: compose(update, Msg.Password, value) }
    }),

    h(`input.${css.input}`, {
      attrs: {
        type: 'password',
        placeholder: 'Confirm password'
      },
      on: { input: compose(update, Msg.Confirm, value) }
    }),

    h(`button.${css.btn}`, {
      attrs: { type: 'submit' }
    }, 'Submit'),

    model.validate ? viewValidation(update)(model) : ''
  ])

const viewValidation = update => model => {
  const errors = [],
        { password, confirm } = model

  if (password !== confirm) errors.push('Passwords do not match')
  if (password.length < 8)  errors.push('Password length must be >= 8 chars')

  if (!/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password))
    errors.push('Password must include uppercase, lowecase, and numeric chars')

  return h('div', {
    style: {
      color: !errors.length ? 'green' : 'red'
    }
  }, !errors.length ? 'OK' : errors.map(error => h('div', error)))
}
