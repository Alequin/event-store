const express = require('express');
const router = express.Router();

const {readAll} = require("./../async-mongo/read")
const contains = require("./../async-mongo/contains")

const {subscriberCollectionName} = require("./../util/collection-postfix")

router.post("/:stream", async (req, res) => {
  const collectionName = collectionNameFromParams(req)
  const {subscriptionPath} = req
  const isAlreadySubscribed = contains({subscriptionPath}, collectionName)

  res.json({
    subscriptionAdded: !isAlreadySubscribed
  })
})

router.delete("/:stream", async (req, res) => {

})

function collectionNameFromParams(request){
  const {stream} = request.params
  return subscriptionCollectionName(stream)
}

module.exports = router;
