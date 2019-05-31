const request = require('request-promise')
const infoData = require('./data')
const getBookData = require('./getData')

function searchQuery (query) {
  let niceQuery = query.split(' ').join('+')
  let finalLink = `${infoData.url}${niceQuery}`
  let refinedData = []
  return new Promise((resolve, reject) => {
    request(finalLink).then(data => {
      let fetchedData = infoData.regex.exec(data)
      while (fetchedData != null) {
        refinedData.push(fetchedData[1])
        fetchedData = infoData.regex.exec(data)
      }
      getBookData(refinedData)
        .then(res => resolve(res))
        .catch(err => reject(err))
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = searchQuery
