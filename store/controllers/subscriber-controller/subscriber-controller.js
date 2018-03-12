const express = require('express');
const router = express.Router();

const rabbitMQ = require('amqplib/callback_api');
rabbitMQ.connect('amqp://localhost', function(err, conn) {});

const {readAll} = require("./../async-mongo/read")
const contains = require("./../async-mongo/contains")

const {subscriberCollectionName} = require("./../util/collection-postfix")

router.post("/:stream", async (req, res) => {
  const collectionName = collectionNameFromParams(req)

})

router.delete("/:stream", async (req, res) => {

})

function collectionNameFromParams(request){
  const {stream} = request.params
  return subscriptionCollectionName(stream)
}

module.exports = router;
