'use strict'

const libgen = require('../lib')

libgen(process.argv.slice(2).join(' ') || 'dune')
  .then(books => {
    if (!books || books.length === 0) throw new Error('Live search returned no books')
    console.log(`Live search passed: ${books.length} results; first title: ${books[0].title}`)
  })
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
