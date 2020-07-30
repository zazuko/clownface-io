const { createHandler } = require('./lib/proxy')
const wrapFetch = require('./lib/fetch')

module.exports = ({ factory, datasetFactory, rdfFetch, fetch, clownface }) => {
  function wrap(pointer) {
    return new Proxy(pointer, createHandler(wrapFetch(rdfFetch, fetch), factory))
  }
  function io ({ dataset = datasetFactory(), graph, term, value, factory, _context } = {}) {
    return wrap(clownface({ dataset, graph, term, value, factory, _context }))
  }

  io.wrap = wrap

  return io
}
