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
            "title":"Handbook of Clinical Drug Data",
            "author":"Philip Anderson",
            "md5":"7B2A4D53FDE834E801C26A2BAB7E0240",
            "download":"http://libgen.io/get.php?md5=7B2A4D53FDE834E801C26A2BAB7E0240"
        },
        {
            "title":"Handbook of Herbs and Spices",
            "author":"K V Peter",
            "md5":"048EA0496DB0444F873139CD705A07AF",
            "download":"http://libgen.io/get.php?md5=048EA0496DB0444F873139CD705A07AF"
        }
    ]
```

### If you've been waiting for long for this. [Please star the project on GitHub](https://github.com/Doc-Han/LibGen.git)

Hence you can do what you want with it. Thank You
