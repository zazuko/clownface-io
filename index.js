const toArray= require('clownface/lib/toArray')
const Clownface = require('clownface/lib/Clownface')
const rdf = require('rdf-ext')
const fetch = require('./lib/fetch')

class ClownfaceIo extends Clownface {
  constructor ({ dataset = rdf.dataset(), graph, term, value, factory = rdf, _context }) {
    super({ dataset, graph, term, value, factory, _context })

    super.constructor.fromContext = context => {
      return new this.constructor({ _context: toArray(context), factory: context.factory })
    }
  }

  fetch (options) {
    return fetch.call(this, options)
  }
}

function factory ({ dataset, graph, term, value, factory, _context } = {}) {
  return new ClownfaceIo({ dataset, graph, term, value, factory, _context })
}

module.exports = factory
