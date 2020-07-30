const { createHandler } = require('./lib/proxy')
const wrapFetch = require('./lib/fetch')

module.exports = ({ factory, rdfFetch, fetch, formats, clownface }) => {
  const rdf = factory

  function wrap(pointer) {
    return new Proxy(pointer, createHandler(wrapFetch(rdfFetch, fetch, formats), factory))
  }
  function io ({ dataset = rdf.dataset(), graph, term, value, factory = rdf, _context } = {}) {
    return wrap(clownface({ dataset, graph, term, value, factory, _context }))
  }

  io.wrap = wrap

  return io
}
