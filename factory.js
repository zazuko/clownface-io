const { createHandler } = require('./lib/proxy')

module.exports = ({ factory, datasetFactory, fetch, clownface }) => {
  function wrap(pointer) {
    return new Proxy(pointer, createHandler(fetch, factory))
  }
  function io ({ dataset = datasetFactory(), graph, term, value, factory, _context } = {}) {
    return wrap(clownface({ dataset, graph, term, value, factory, _context }))
  }

  return { io, wrap }
}
