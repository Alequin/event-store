const express = require('express');
const router = express.Router();

const {readAll} = require("./../async-mongo/read")
const insertEvents = require("./util/insert-events")
const validateEvents = require("./util/validate-events")
const addTimeStampToEvents = require("./util/add-time-stamp-to-events")

const publishToSubscribers = require("./../rabbit-mq/publish-to-subscribers")

router.get('/:stream', async (req, res) => {
  res.json(await readAll(req.params.stream))
})

router.post("/:stream", async (req, res) => {
  const {stream} = req.params
  const events = req.body

  const {areEventsValid, errors} = validateEvents(events)

  if(areEventsValid){
    const eventsWithTimeStamp = addTimeStampToEvents(events)
    const result = await insertEvents(eventsWithTimeStamp, stream)
    publishToSubscribers(stream, events)
    res.json(result)
  }else{
    res.json(errors)
  }
})

module.exports = router;
