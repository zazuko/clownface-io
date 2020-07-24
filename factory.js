const { createHandler } = require('./lib/proxy')

module.exports = ({ factory, datasetFactory, fetch, clownface }) => ({
  wrap(pointer) {
    return new Proxy(pointer, createHandler(fetch, factory))
  },
  io ({ dataset = datasetFactory(), graph, term, value, factory, _context } = {}) {
    return this.wrap(clownface({ dataset, graph, term, value, factory, _context }))
  }
})
