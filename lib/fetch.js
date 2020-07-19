const Context = require('clownface/lib/Context')
const rdfFetch = require('@rdfjs/fetch')
const rawFetch = require('./rawFetch')

function checkResponse (res) {
  if (res.ok) {
    return
  }

  const err = new Error(res.statusText)
  err.status = res.status

  throw err
}

async function fetch (options = {}) {
  const context = await Promise.all(this.terms.map(async term => {
    const res = await rdfFetch(term.value, {
      factory: this.factory,
      fetch: rawFetch,
      ...options
    })

    checkResponse(res)

    const dataset = await res.dataset()

    return new Context({
      dataset,
      // graph,
      value: term,
      factory: this.factory,
      namespace: this.namespace
    })
  }))

  return new this.constructor({ _context: context })
}

module.exports = fetch
