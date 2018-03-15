const express = require('express')
const bodyParser = require('body-parser')

const indexController = require("./controllers/index-controller")
const eventController = require("./controllers/event-controller/event-controller")
const streamController = require("./controllers/stream-controller/stream-controller")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", indexController)
app.use("/events", eventController)
app.use("/streams", streamController)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
