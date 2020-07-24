const Context = require('clownface/lib/Context')
const clownface = require('clownface')
const rdfFetch = require('@rdfjs/fetch')
const TermMap = require('@rdfjs/term-map')
const rawFetch = require('./rawFetch')
const { clownfaceIoHandler } = require('./proxy')

function checkResponse (res) {
  if (res.ok) {
    return
  }

  const err = new Error(res.statusText)
  err.status = res.status

  throw err
}

class ClownfaceIoRequest {
  constructor (fetches, factory, namespace) {
    this.__fetches = fetches
    this.__factory = factory
    this.__namespace = namespace
  }

  get successful() {
    return (async () => {
      const results = await Promise.all(this.__fetches)

      const _context = await Promise.all(results.filter(([r]) => r.ok)
        .map(async ([res, term]) => {
          const dataset = await res.dataset()

          return new Context({
            dataset,
            // graph,
            value: term,
            factory: this.__factory,
            namespace: this.__namespace
          })
        }))

      return new Proxy(clownface({_context}), clownfaceIoHandler(fetch))
    })()
  }

  get failed() {
    return (async () => {
      const results = await Promise.all(this.__fetches)
      const failed = await Promise.all(results.filter(([r]) => !r.ok))

      return failed.reduce((map, [res, term]) => {
        map.set(term, res)
        return map
      }, new TermMap())
    })()
  }
}

function fetch (options = {}) {
  return new ClownfaceIoRequest(this.terms.map(async term => {
    try {
      return [await rdfFetch(term.value, {
        factory: this.factory,
        fetch: rawFetch,
        ...options
      }), term]
    } catch(error) {
      return [{ ok: false, error }, term]
    }
  }), this.factory, this.namespace)
}

module.exports = fetch
