const Context = require('clownface/lib/Context')
const clownface = require('clownface')
const rdfFetch = require('@rdfjs/fetch')
const TermMap = require('@rdfjs/term-map')
const rawFetch = require('./rawFetch')
const { createHandler } = require('./proxy')

function checkResponse (res) {
  if (res.ok) {
    return
  }

  const err = new Error(res.statusText)
  err.status = res.status

  throw err
}

class ClownfaceIoRequest extends Promise {
  constructor (executor, fetches, factory, namespace) {
    super(executor)
    this.__fetches = fetches
    this.__factory = factory
    this.__namespace = namespace
  }

  get failures() {
    return (async () => {
      const results = await Promise.all(this.__fetches)
      const failed = await Promise.all(results.filter(([, { error }]) => error))

      return failed.reduce((map, [term, value]) => {
        map.set(term, value)
        return map
      }, new TermMap())
    })()
  }
}

function fetch (options = {}) {
  const fetches = this.terms.map(async term => {
    let response = null
    try {
      response = await rdfFetch(term.value, {
        factory: this.factory,
        fetch: rawFetch,
        ...options
      })

      if (!response.ok) {
        return [term, { response, error: new Error(response.statusText) }]
      }

      return [term, { response, dataset: await response.dataset() }]
    } catch(error) {
      return [term, { response, error }]
    }
  })

  async function executor (resolve) {
    const responses = await Promise.all(fetches)

    const _context = await Promise.all(responses
      .filter(([, {error}]) => !error)
      .map(async ([term, { dataset }]) => {
        return new Context({
          dataset,
          // graph,
          value: term,
          factory: this.__factory,
          namespace: this.__namespace
        })
      }))

    resolve(new Proxy(clownface({_context}), createHandler(fetch, this.__factory)))
  }

  return new ClownfaceIoRequest(executor, fetches, this.factory, this.namespace)
}

module.exports = fetch
