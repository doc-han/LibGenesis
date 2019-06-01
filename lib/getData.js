const request = require('request-promise')
const { dataUrl, dlUrl } = require('./data')

function getBookData (ids) {
  let niceIds = ids.join(',')
  let finalLink = `${dataUrl}${niceIds}`
  return new Promise((resolve, reject) => {
    request(finalLink)
      .then(data => {
        let parsedData = parseData(data)
        parsedData.forEach(el => {
          el.download = `${dlUrl}${el['md5']}`
        })
        resolve(parsedData)
      })
      .catch(err => reject(err))
  })
}

function parseData (data) {
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (e) {

  }
  return parsedData
}

module.exports = getBookData
