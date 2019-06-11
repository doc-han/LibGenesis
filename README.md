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

3. Download books with a simple **GET** request to the download link in the response

```javascript
    [
        { 
            id: '2348853',
            title: 'From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars',
            author: 'Manfred "Dutch" Von Ehrenfried',
            language: 'English',
            filesize: '13.32MB',
            extension: 'pdf',
            download: 'http://download.library1.org/main/2348000/31d6ee634d383579863137448c347b67/Manfred "Dutch" Von Ehrenfried - From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars-Springer Praxis Books (2019).pdf',
            bookImage: 'http://library1.org/covers/2348000/31d6ee634d383579863137448c347b67-d.jpg' },
        { 
            id: '2348854',
            title: 'From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars',
            author: 'Manfred "Dutch" Von Ehrenfried',
            language: 'English',
            filesize: '74.75MB',
            extension: 'epub',
            download: 'http://download.library1.org/main/2348000/b628824068dd80a12773e43e8fd93bac/Manfred "Dutch" Von Ehrenfried - From Cave Man to Cave Martian: Living in Caves on the Earth, Moon and Mars-Springer Praxis Books (2019).epub',
            bookImage: 'http://library1.org/covers/2348000/b628824068dd80a12773e43e8fd93bac-d.jpg' 
        }
    ]
```

### If you've been waiting for long for this. [Please star the project on GitHub](https://github.com/Doc-Han/LibGen.git)

Hence you can do what you want with it. Thank You
