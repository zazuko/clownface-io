const clownfaceIo = require('..')

async function main () {
  try {
    const tbbtLink = clownfaceIo().namedNode('file:node_modules/tbbt-ld/dist/tbbt.nq')
    const tbbt = await tbbtLink.fetch()
    const amy = tbbt.namedNode('http://localhost:8080/data/person/amy-farrah-fowler')

    console.log(amy.term.value)
    console.log(amy.dataset.size)
    console.log(amy.out().terms.length)
  } catch (err) {
    console.error(err)
  }
}

main()
