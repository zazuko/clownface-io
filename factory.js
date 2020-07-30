const { createHandler } = require('./lib/proxy')
const wrapFetch = require('./lib/fetch')

module.exports = ({ factory, rdfFetch, fetch, clownface }) => {
  const rdf = factory

  function wrap(pointer) {
    return new Proxy(pointer, createHandler(wrapFetch(rdfFetch, fetch), factory))
  }
  function io ({ dataset = rdf.dataset(), graph, term, value, factory = rdf, _context } = {}) {
    return wrap(clownface({ dataset, graph, term, value, factory, _context }))
  }

  io.wrap = wrap

  return io
}
