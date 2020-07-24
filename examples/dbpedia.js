const namespace = require('@rdfjs/namespace')
const clownface = require('..')

const ns = {
  dbp: namespace('http://dbpedia.org/property/'),
  dbr: namespace('http://dbpedia.org/resource/'),
  foaf: namespace('http://xmlns.com/foaf/0.1/')
}

async function main () {
  try {
    const eiffelTowerLink = clownface.io().namedNode(ns.dbr('Eiffel_Tower'))
    const eiffelTower = await eiffelTowerLink.fetch()

    console.log(eiffelTower.term.value)
    console.log(eiffelTower.dataset.size)
    console.log(eiffelTower.out().terms.length)

    const mainContractorLink = eiffelTower.out(ns.dbp.mainContractor)
    const mainContractor = await mainContractorLink.fetch()

    console.log(mainContractor.out(ns.foaf.name).value)
  } catch (err) {
    console.error(err)
  }
}

main()
