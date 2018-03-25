const express = require('express');
const router = express.Router();

const {readAll, readBy} = require("./../async-mongo/read")

const insertEvents = require("./util/insert-events")
const rejectEmptyMapValues = require("./util/reject-empty-map-values")
const validateEvents = require("./util/validate-events")

const publishToSubscribers = require("./rabbit-mq/publish-to-subscribers")

router.get('/:stream', async (req, res) => {
  const {type, aggregateId, limit} = req.query
  const searchCriteria = rejectEmptyMapValues({type, aggregateId})
  const searchOptions = rejectEmptyMapValues({sort: [['position', -1]], limit: parseInt(limit)})
  res.json(await readBy(searchCriteria, req.params.stream, searchOptions))
})

router.post("/:stream", async (req, res) => {
  const {stream} = req.params
  const events = req.body
  const {areEventsValid, errors} = validateEvents(events)

  if(areEventsValid){
    const result = await insertEvents(events, stream)
    publishToSubscribers(stream, result.ops)
    res.json(result)
  }else{
    res.json(errors)
  }
})

module.exports = router;
