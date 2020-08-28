const clownface = require('clownface')
const rdf = require('rdf-ext')
const rdfFetch = require('@rdfjs/fetch')
const fetch = require('./lib/rawFetch')
const factory = require('./factory')

module.exports = factory({ factory: rdf, rdfFetch, fetch, clownface })
