const fileFetch = require('file-fetch')
const httpFetch = require('nodeify-fetch')
const protoFetch = require('proto-fetch')

const fetch = protoFetch({
  file: fileFetch,
  http: httpFetch,
  https: httpFetch
})

module.exports = fetch
