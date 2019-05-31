# LibGen
A wrapup of an API to enable the search of paid books for free through Library Genesis
This module enables you to search books by name and have an array response of books related to search query
## How it works
1. Require the module
```javascript
    const libgen = require('libgen-search');
```
2. Pass your search query
The function returns a promise, Hence, you are to wait for response as below
```javascript
    libgen("book name").then(function(books){
        //do something with books
        console.log(books);
    }).catch(function(error){
        //throw error
        throw error;
    })
``` 
3. How the returned array of objects look like
```javascript
    [
        {
            "title":"Handbook of Clinical Drug Data",
            "author":"Philip Anderson",
            "md5":"7B2A4D53FDE834E801C26A2BAB7E0240"
        },
        {
            "title":"Handbook of Herbs and Spices",
            "author":"K V Peter",
            "md5":"048EA0496DB0444F873139CD705A07AF"
        }
    ]
```
Hence you can do what you want with it. Thank You