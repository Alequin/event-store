
const insert = require("./../../async-mongo/insert")
const update = require("./../../async-mongo/update")

const {lastEventPosition} = require("./last-event")
const prepareNewEvents = require("./prepare-new-events")

async function insertEvents(events, collectionName){
  const prevLastPosition = await lastEventPosition(collectionName)
  const eventsToInsert = prepareNewEvents(events, prevLastPosition)
  await setOldTailToFalse(collectionName)
  return await insert(eventsToInsert, collectionName)
}

async function setOldTailToFalse(collectionName){
  await update({tail: true}, {$set: {tail: false}}, collectionName)
}

module.exports = insertEvents
