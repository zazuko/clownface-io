const clownface = require('clownface')
const rdf = require('rdf-ext')
const fetch = require('./lib/fetch')
const { clownfaceIoHandler } = require('./lib/proxy')

function wrap (pointer) {
  return new Proxy(pointer, clownfaceIoHandler(fetch))
}

function factory ({ dataset = rdf.dataset(), graph, term, value, factory = rdf, _context } = {}) {
  return wrap(clownface({ dataset, graph, term, value, factory, _context }))
}

module.exports = {
  io: factory,
  wrap,
}
