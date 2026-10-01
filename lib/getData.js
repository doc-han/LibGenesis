'use strict'

const { URL } = require('url')

const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
const cellPattern = /<td[^>]*>([\s\S]*?)<\/td>/gi
const md5Pattern = /(?:md5=|\/ads\.php\?md5=|\/book\/)([a-f0-9]{32})/i
const fileIdPattern = /file\.php\?id=(\d+)/i
// Start at the edition URL rather than at <a>: tooltip attributes can contain
// literal <br> markup, so a conventional "attributes up to >" regex truncates.
const editionTitlePattern = /edition\.php\?id=\d+["'][^>]*>([\s\S]*?)<\/a>/i
const anchorPattern = /<a[^>]*>([\s\S]*?)<\/a>/i
const tagPattern = /<[^>]*>/g

function decodeEntities (value) {
  const named = { amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"' }
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (match, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()] || match
    const hexadecimal = entity[1].toLowerCase() === 'x'
    const codePoint = parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10)
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match
  })
}

function cleanText (value) {
  return decodeEntities(value.replace(tagPattern, ' ')).replace(/\s+/g, ' ').trim()
}

function parseTitle (cell) {
  const editionTitle = editionTitlePattern.exec(cell)
  if (editionTitle) return cleanText(editionTitle[1])
  const anchor = anchorPattern.exec(cell)
  return cleanText(anchor ? anchor[1] : cell)
}

function formatFilesize (value) {
  const text = cleanText(value)
  const match = text.match(/^([\d.,]+)\s*([kmgt]?i?b|bytes?)?$/i)
  if (!match) return text
  const amount = Number(match[1].replace(',', '.'))
  const unit = (match[2] || 'B').toUpperCase()
  return `${amount}${unit === 'BYTES' || unit === 'BYTE' || unit === 'B' ? 'Bytes' : unit}`
}

function parseBookData (html, mirror) {
  const books = []
  let row
  rowPattern.lastIndex = 0

  while ((row = rowPattern.exec(html)) !== null) {
    const rowHtml = row[1]
    const cells = []
    let cell
    cellPattern.lastIndex = 0
    while ((cell = cellPattern.exec(rowHtml)) !== null) cells.push(cell[1])
    if (cells.length < 8) continue

    const md5Match = md5Pattern.exec(rowHtml)
    if (!md5Match) continue

    const md5 = md5Match[1].toLowerCase()
    const idMatch = fileIdPattern.exec(rowHtml)
    const yearMatch = cleanText(cells[3]).match(/\b\d{4}\b/)
    const pageUrl = new URL(`/ads.php?md5=${md5}`, mirror).toString()

    books.push({
      id: idMatch ? idMatch[1] : '',
      title: parseTitle(cells[0]),
      author: cleanText(cells[1]),
      language: cleanText(cells[4]),
      filesize: formatFilesize(cells[6]),
      extension: cleanText(cells[7]).toLowerCase(),
      download: pageUrl,
      bookImage: null,
      publisher: cleanText(cells[2]),
      year: yearMatch ? yearMatch[0] : '',
      pages: cleanText(cells[5])
    })
  }

  return books
}

module.exports = parseBookData
module.exports.cleanText = cleanText
module.exports.formatFilesize = formatFilesize
