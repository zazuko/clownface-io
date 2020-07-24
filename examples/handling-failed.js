const namespace = require('@rdfjs/namespace')
const clownface = require('clownface')
const rdf = require('rdf-ext')
const { io } = require('..')

const ns = {
  rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#')
}

async function main () {
  const graph = clownface({ dataset: rdf.dataset() })
    .blankNode()
    .addOut(ns.rdfs.seeAlso, [
      rdf.namedNode('http://dbpedia.org/resource/Eiffel_Tower'),
      rdf.namedNode('http://dbpedia.org/resource/London_Bridge'),
      rdf.namedNode('http://dbpedia.ork/resource/Eiffel_Tower'), // bogus domain
      rdf.namedNode('http://google.com'), // non-RDF resource
      rdf.namedNode('http://zazuko.github.com/foo-bar') // Not found
    ])

  const seeAlsoLinks = io(graph).out(ns.rdfs.seeAlso)
  const request = seeAlsoLinks.fetch()
  const resources = await request

  // awaited request acts just like graph pointer
  console.log(`Received ${resources.values.length} resources: ${resources.out(ns.rdfs.label, { language: 'en' }).values}`)

  // any failures are a TermMap returned by the failures property
  const failedRequests = await request.failures
  ;[...failedRequests.entries()].forEach(([term, { error }]) => {
    console.log(`${term.value} failed because ${error.message}`)
  })
}

main()
