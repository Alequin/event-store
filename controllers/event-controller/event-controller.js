const express = require('express');
const router = express.Router();

const {readAll} = require("./../async-mongo/read")
const {eventCollectionName} = require("./../util/collection-postfix")
const insertEvents = require("./util/insert-events")

router.get('/:stream', async (req, res) => {
  const collectionName = collectionNameFromParams(req)
  res.json(await readAll(collectionName))
})

router.post("/:stream", async (req, res) => {
  const collectionName = collectionNameFromParams(req)
  const events = req.body
  const result = await insertEvents(events, collectionName)
  res.json(result)
})

function collectionNameFromParams(request){
  const {stream} = request.params
  return eventCollectionName(stream)
}

module.exports = router;
