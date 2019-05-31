const request = require('request-promise')
const infoData = require('./data')
const getBookData = require('./getData')

function searchQuery (query) {
  let niceQuery = query.split(' ').join('+')
  let finalLink = `${infoData.url}${niceQuery}`
  return new Promise((resolve, reject) => {
    request(finalLink).then(data => {
      let fetchedData = data.match(infoData.regex)
      let refinedData = fetchedData.map(i => i.slice(4, (i.length - 5)) * 1)
      getBookData(refinedData)
        .then(res => resolve(res))
        .catch(err => reject(err))
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = searchQuery
