const express = require('express')
const bodyParser = require('body-parser')

const indexController = require("./source/controllers/index-controller")
const eventController = require("./source/controllers/event-controller/event-controller")
const streamController = require("./source/controllers/stream-controller/stream-controller")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", indexController)
app.use("/events", eventController)
app.use("/streams", streamController)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
