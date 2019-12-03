const express = require('express')
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const app = express()


// body parser settings
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// routes
app.get("/", (req, res) => {
  res.send('うぇるかむ　おーすさーばー')
})

// start server
app.listen(80)
console.log("started auth server http://localhost:80 .")
