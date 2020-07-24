const Clownface = require('clownface/lib/Clownface')
const rdf = require('rdf-ext')

const clownfaceIoHandler = fetch => ({
  get(target, name) {
    if (name === 'fetch') {
      return (options) => fetch.call(target, options)
    }

    if (typeof target[name] === 'function') {
      return new Proxy(target[name], {
        apply(targetFunc, that, args) {
          const result = targetFunc.call(that, ...args)
          if (result instanceof Clownface) {
            result.factory = rdf
            return new Proxy(result, clownfaceIoHandler(fetch))
          }

          return result
        }
      })
    }

    return target[name]
  },
})

module.exports = {
  clownfaceIoHandler
}
