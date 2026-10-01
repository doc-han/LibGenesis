'use strict'

const assert = require('assert')
const { EventEmitter } = require('events')
const { test } = require('node:test')
const search = require('../lib')
const parseBookData = require('../lib/getData')

const fixture = `<table id="tablelibgen" class="table-striped">
<tr><th>Title</th><th>Author</th></tr>
<tr>
<td><b>Series</b><br><a data-html="true" title="ID: 999<br>tooltip" href="edition.php?id=143">Dune &amp; Messiah</a></td>
<td>Frank Herbert</td><td>Presses Pocket</td><td><nobr>1980 January</nobr></td>
<td>English</td><td>320</td><td><a href="/file.php?id=99923650">781 kB</a></td><td>EPUB</td>
<td><a href="/ads.php?md5=E7C75DC2964CE80C19CB69140AAE8614">Libgen</a></td>
</tr></table>`

function transportReturning (responses, requestedUrls) {
  return {
    get: (url, options, callback) => {
      requestedUrls.push({ url, options })
      const request = new EventEmitter()
      request.setTimeout = () => {}
      request.destroy = error => request.emit('error', error)
      process.nextTick(() => {
        const next = responses.shift()
        if (next instanceof Error) return request.emit('error', next)
        const response = new EventEmitter()
        response.statusCode = next.statusCode || 200
        response.headers = next.headers || {}
        response.setEncoding = () => {}
        response.resume = () => {}
        callback(response)
        process.nextTick(() => {
          response.emit('data', next.body || '')
          response.emit('end')
        })
      })
      return request
    }
  }
}

test('parses current LibGen result tables', () => {
  const books = parseBookData(fixture, 'https://libgen.li')
  assert.deepStrictEqual(books, [{
    id: '99923650', title: 'Dune & Messiah', author: 'Frank Herbert', language: 'English',
    filesize: '781KB', extension: 'epub',
    download: 'https://libgen.li/ads.php?md5=e7c75dc2964ce80c19cb69140aae8614',
    bookImage: null, publisher: 'Presses Pocket', year: '1980', pages: '320'
  }])
})

test('search encodes the query, uses a browser user-agent and returns books', async () => {
  const requests = []
  const result = await search('dune & messiah', {
    mirrors: ['https://libgen.li'],
    transport: transportReturning([{ body: fixture }], requests)
  })
  assert.strictEqual(result.length, 1)
  assert.match(requests[0].url, /req=dune(?:\+|%20)%26(?:\+|%20)messiah/)
  assert.match(requests[0].options.headers['User-Agent'], /Mozilla/)
  assert.strictEqual(requests[0].options.headers.Referer, 'https://libgen.li/index.php')
})

test('search fails over to the next mirror', async () => {
  const requests = []
  const result = await search('dune', {
    mirrors: ['https://libgen.li', 'https://libgen.vg'],
    transport: transportReturning([new Error('unreachable'), { body: fixture }], requests)
  })
  assert.strictEqual(result.length, 1)
  assert.strictEqual(requests.length, 2)
  assert.match(requests[1].url, /^https:\/\/libgen\.vg/)
  assert.match(result[0].download, /^https:\/\/libgen\.vg/)
})

test('search returns null for a valid empty result page', async () => {
  const requests = []
  const result = await search('nothing', {
    mirrors: ['https://libgen.li'],
    transport: transportReturning([{ body: '<table id="tablelibgen"></table>' }], requests)
  })
  assert.strictEqual(result, null)
})

test('search rejects invalid queries', async () => {
  await assert.rejects(search('  '), /non-empty string/)
})
