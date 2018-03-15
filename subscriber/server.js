const express = require('express')
const bodyParser = require('body-parser')

const subscribe = require("./subscribe/subscribe")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

subscribe("stream-set-1", (events) => {
  console.log(events);
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))
