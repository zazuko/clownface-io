const formats = require('@rdfjs/formats-common')
const rdf = require('@rdfjs/dataset')
const rdfFetch = require('@rdfjs/fetch-lite')
const namespace = require('@rdfjs/namespace')
const nodeifyFetch = require('nodeify-fetch')
const realClownface = require('clownface')
const setup = require('../factory')

const clownface = setup({
  factory: rdf,
  rdfFetch,
  fetch: nodeifyFetch,
  clownface: realClownface,
  formats,
})

const ns = {
  dbp: namespace('http://dbpedia.org/property/'),
  dbr: namespace('http://dbpedia.org/resource/'),
  foaf: namespace('http://xmlns.com/foaf/0.1/')
}

async function main () {
  try {
    const eiffelTowerLink = clownface().namedNode(ns.dbr('Eiffel_Tower'))
    const eiffelTower = await eiffelTowerLink.fetch()

    console.log(eiffelTower.term.value)
    console.log(eiffelTower.dataset.size)
  } catch (err) {
    console.error(err)
  }
}

main()
