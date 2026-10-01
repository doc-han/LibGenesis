'use strict'

const https = require('https')
const info = require('./data')
const parseBookData = require('./getData')

function get (url, options = {}) {
  const transport = options.transport || https
  const timeout = options.timeout || info.timeout

  return new Promise((resolve, reject) => {
    const requestUrl = new URL(url)
    const request = transport.get(url, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        Referer: `${requestUrl.origin}${info.searchPath}`,
        'User-Agent': info.userAgent
      }
    }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume()
        return resolve(get(new URL(response.headers.location, url).toString(), options))
      }
      if (response.statusCode !== 200) {
        response.resume()
        return reject(new Error(`LibGen returned HTTP ${response.statusCode}`))
      }

      response.setEncoding('utf8')
      let body = ''
      response.on('data', chunk => { body += chunk })
      response.on('end', () => resolve(body))
    })

    request.setTimeout(timeout, () => request.destroy(new Error(`LibGen request timed out after ${timeout}ms`)))
    request.on('error', reject)
  })
}

async function searchQuery (query, options = {}) {
  if (typeof query !== 'string' || query.trim() === '') {
    throw new TypeError('query must be a non-empty string')
  }

  const mirrors = options.mirrors || info.mirrors
  let lastError
  for (const mirror of mirrors) {
    const url = new URL(info.searchPath, mirror)
    url.searchParams.set('req', query.trim())
    url.searchParams.set('res', '100')

    try {
      const html = await get(url.toString(), options)
      const books = parseBookData(html, mirror)
      if (books.length > 0) return books
      if (/tablelibgen|table-striped/i.test(html)) return null
      lastError = new Error(`${mirror} returned an unrecognized search page`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('No LibGen search mirrors are configured')
}

module.exports = searchQuery
module.exports.get = get
