const request = require('request-promise')
const dataUrl = require('./data').dataUrl

function getBookData (ids) {
  let niceIds = ids.join(',')
  let finalLink = `${dataUrl}${niceIds}`
  return new Promise((resolve, reject) => {
    request(finalLink)
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

module.exports = getBookData
