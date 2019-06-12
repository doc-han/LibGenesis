const request = require('request-promise')
const { dataUrl, dlUrl, coversUrl } = require('./data')

function getBookData (ids) {
  let niceIds = ids.join(',')
  let finalLink = `${dataUrl}${niceIds}`
  return new Promise((resolve, reject) => {
    request(finalLink)
      .then(data => {
        let parsedData = parseData(data)
        if(parsedData.error != undefined){
          resolve(null);
        }else{
          parsedData.forEach(el => {
            el.download = `${dlUrl}/${Math.floor(el.id / 1000) * 1000}/${el.md5.toLowerCase()}/${el.author} - ${el.title}-${el.publisher} (${el.year}).${el.extension}`
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
            delete el.publisher
            delete el.year
          })
          resolve(parsedData)
        }
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
