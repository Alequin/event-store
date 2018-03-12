const express = require('express');
const router = express.Router();

const rabbitMQ = require('amqplib/callback_api');

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

  rabbitMQ.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      const queueName = req.stream;
      ch.assertQueue(queueName, {durable: false});
      ch.sendToQueue(queueName, new Buffer(events));
      console.log("Sent events to rabbitMQ");
      conn.close()
    });
  });

  res.json(result)
})

function collectionNameFromParams(request){
  const {stream} = request.params
  return eventCollectionName(stream)
}

module.exports = router;
