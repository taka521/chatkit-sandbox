const express = require('express')

const app = express()


// routes
app.get("/", (req, res) => {
  res.send('うぇるかむ　ちゃっとあぷり')
})

// start server
app.listen(80)
console.log("started chat app server http://localhost:80 .")
