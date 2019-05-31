let libgen = require('../lib/index')
libgen('a man on moon').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
