const Context = require('clownface/lib/Context')
const clownface = require('clownface')
const TermMap = require('@rdfjs/term-map')
const { createHandler } = require('./proxy')

const wrapFetch = (rdfFetch, rawFetch, formats) => async function (options = {}) {
  const fetches = this.terms.map(async term => {
    let response = null
    try {
      response = await rdfFetch(term.value, {
        factory: this.factory,
        fetch: rawFetch,
        formats,
        ...options
      })

      if (!response.ok) {
        return [term, { response, error: new Error(response.statusText) }]
      }

      return [term, { response, dataset: await response.dataset() }]
    } catch (error) {
      return [term, { response, error }]
    }
  })

  const responses = await Promise.all(await Promise.all(fetches))
  const failures = responses
    .filter(([, { error }]) => error)
    .reduce((map, [term, value]) => {
      map.set(term, value)
      return map
    }, new TermMap())

  const _context = responses
    .filter(([, { error }]) => !error)
    .map(([term, { dataset }]) => {
      return new Context({
        dataset,
        // graph,
        value: term,
        factory: this.__factory,
        namespace: this.__namespace
      })
    })

  const pointer = clownface({ _context })
  const handler = createHandler(wrapFetch(rdfFetch, rawFetch), this.__factory, failures)

  return new Proxy(pointer, handler)
}

module.exports = wrapFetch
