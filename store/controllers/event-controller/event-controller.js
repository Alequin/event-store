const express = require('express');
const router = express.Router();

const {readAll} = require("./../async-mongo/read")
const insertEvents = require("./util/insert-events")
const validateEvents = require("./util/validate-events")

const publish = require("./../rabbit-mq/publish-event")

router.get('/:stream', async (req, res) => {
  res.json(await readAll(req.params.stream))
})

router.post("/:stream", async (req, res) => {
  const {stream} = req.params
  const events = req.body

  const {areEventsValid, errors} = validateEvents(events)

  if(areEventsValid){
    const result = await insertEvents(events, stream)
    publish(stream, events)
    res.json(result)
  }else{
    res.json(errors)
  }
})

module.exports = router;
