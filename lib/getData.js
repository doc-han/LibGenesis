const request = require('request-promise')
const { dataUrl, dlUrl, coversUrl } = require('./data')

function getBookData (ids) {
  let niceIds = ids.join(',')
  let finalLink = `${dataUrl}${niceIds}`
  return new Promise((resolve, reject) => {
    request(finalLink)
      .then(data => {
        let parsedData = parseData(data)
        parsedData.forEach(el => {
          el.download = `${dlUrl}${el.md5}`
          el.bookImage = `${coversUrl}${el.coverurl}`
          if (el.filesize % 1048576 > 0) {
            el.filesize = (el.filesize / 1048576).toFixed(2) + 'MB'
          } else if (el.filesize % 1024 > 0) {
            el.filesize = (el.filesize / 1024).toFixed(2) + 'KB'
          } else {
            el.filesize = el.filesize.toFixed(2) + 'Bytes'
          }
          delete el.coverurl
          delete el.md5
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
