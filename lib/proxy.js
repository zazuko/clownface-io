const Clownface = require('clownface/lib/Clownface')

const createHandler = (fetch, factory, failures) => ({
  get (target, name) {
    if (name === 'fetch') {
      return (options) => fetch.call(target, options)
    }

    if (name === 'failures') {
      return failures
    }

    if (typeof target[name] === 'function') {
      return new Proxy(target[name], {
        apply (targetFunc, that, args) {
          const result = targetFunc.call(that, ...args)
          if (result instanceof Clownface) {
            result.factory = factory
            return new Proxy(result, createHandler(fetch, factory))
          }

          return result
        }
      })
    }

    return target[name]
  }
})

module.exports = {
  createHandler
}
