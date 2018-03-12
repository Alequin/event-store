
const { readBy } = require("./../../async-mongo/read")

async function lastEvent(collectionName){
  return (await readBy({tail: true}, collectionName))[0]
}

async function lastEventPosition(collectionName){
  const event = await lastEvent(collectionName)
  return event ? event.position : -1
}

module.exports = {
  lastEvent,
  lastEventPosition
}
