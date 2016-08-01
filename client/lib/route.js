const compose      = require('ramda/src/compose')
const flyd         = require('flyd')
const pathToRegexp = require('path-to-regexp')

const { hasOwnProperty } = Object.prototype

const hash = e => location.hash.slice(1),
      url  = flyd.stream(hash())

window.addEventListener('hashchange', compose(url, hash))

function route(initial, routes={}) {
  return flyd.combine(url => {
    if (!url()) {
      location.hash = initial
      return
    }

    for (var path in routes) {
      var keys = [],
          re = pathToRegexp(path, keys),
          m  = re.exec(url()),
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
        return routes[path](params)
      }
    }

    console.error('Route not found: %s', url())
  }, [url])
}

module.exports = route
