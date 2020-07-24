const clownface = require('clownface')
const rdf = require('rdf-ext')
const fetch = require('./lib/fetch')
const factory = require('./factory')

module.exports = factory({ datasetFactory: rdf.dataset, factory: rdf, fetch, clownface })
