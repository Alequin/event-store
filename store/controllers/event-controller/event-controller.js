const express = require('express');
const router = express.Router();

const {readAll, readBy} = require("./../async-mongo/read")
const insertEvents = require("./util/insert-events")
const validateEvents = require("./util/validate-events")
const addTimeStampToEvents = require("./util/add-time-stamp-to-events")

const publishToSubscribers = require("./../rabbit-mq/publish-to-subscribers")

router.get('/:stream/event-type/:type', async (req, res) => {
  const {type} = req.params
  res.json(await readBy({type}, req.params.stream))
})

router.get('/:stream/aggregateId/:aggregateId', async (req, res) => {
  const {aggregateId} = req.params
  res.json(await readBy({aggregateId}, req.params.stream))
})

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
    publishToSubscribers(stream, result.ops)
    res.json(result)
  }else{
    res.json(errors)
  }
})

module.exports = router;
