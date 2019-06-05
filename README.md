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
            title: 'Wild Earth, Wild Soul : a Manual for an Ecstatic Culture',
            author: 'Bill Pfeiffer, John Perkins',
            language: 'English',
            filesize: '1.24MB',
            extension: 'epub',
            download: 'http://libgen.io/get.php?md5=f1adae1cbabaae30a375237aa9a452e7',
            bookImage: 'http://library1.org/covers/2085000/f1adae1cbabaae30a375237aa9a452e7-d.jpg' 
        },
        { 
            title: 'How to Model Small Boats',
            author: 'A.Richard Mansir',
            language: 'English',
            filesize: '43.15MB',
            extension: 'pdf',
            download: 'http://libgen.io/get.php?md5=fddf0522d8fd2616b2e2e2f9f9297f68',
            bookImage: 'http://library1.org/covers/2118000/fddf0522d8fd2616b2e2e2f9f9297f68-g.jpg' 
        }
    ]
```

### If you've been waiting for long for this. [Please star the project on GitHub](https://github.com/Doc-Han/LibGen.git)

Hence you can do what you want with it. Thank You
