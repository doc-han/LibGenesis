# LibGenesis

[![Build Status](https://travis-ci.com/Doc-Han/LibGen.svg?branch=master)](https://travis-ci.com/Doc-Han/LibGen)
![GitHub package.json version](https://img.shields.io/github/package-json/v/doc-han/libgen.svg?color=%2328a745)
![npm](https://img.shields.io/npm/dm/libgenesis.svg)
![npm](https://img.shields.io/npm/v/libgenesis.svg)
![GitHub](https://img.shields.io/github/license/doc-han/libgen.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/libgenesis.svg?color=orange)

A simple module for getting and downloading paid books or PDF's for free. This module is based on Library Genesis and works by getting books straight from the portal. More features will be integrated soon. 
## How it works

1. Install and require the package

```javascript
    const libgen = require('libgenesis');
```

2. Pass your search query. 

The function returns a promise, Hence, you are to wait for response as below

```javascript
    libgen("book name here").then(function(books){
        //do something with books
        console.log(books);
    }).catch(function(error){
        //throw error
        throw error;
    })
``` 

3. The returned array of objects contains the various fields as in the example below. A **null** value is returned when no book was found for the search term. The `download` property points to the selected mirror's download page.

```javascript
    [
        { 
            id: '2348853',
            title: 'From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars',
            author: 'Manfred "Dutch" Von Ehrenfried',
            language: 'English',
            filesize: '13.32MB',
            extension: 'pdf',
            download: 'https://libgen.li/ads.php?md5=31d6ee634d383579863137448c347b67',
            bookImage: null,
            publisher: 'Springer Praxis Books',
            year: '2019',
            pages: '321' },
        { 
            id: '2348854',
            title: 'From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars',
            author: 'Manfred "Dutch" Von Ehrenfried',
            language: 'English',
            filesize: '74.75MB',
            extension: 'epub',
            download: 'https://libgen.li/ads.php?md5=b628824068dd80a12773e43e8fd93bac',
            bookImage: null,
            publisher: 'Springer Praxis Books',
            year: '2019',
            pages: '321'
        }
    ]
```

## Testing

Run the deterministic test suite with `npm test`. To also verify the currently configured live mirrors, run `npm run test:live -- "book title"`.

### If you've been waiting for long for this. [Please star the project on GitHub](https://github.com/Doc-Han/LibGen.git)

Hence you can do what you want with it. Thank You
