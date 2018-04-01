const get = require("lodash/get")
const { readBy } = require("./../../async-mongo/read")

async function lastEvent(collectionName){
  const searchOptions = {sort: [['position', -1]], limit: 1}
  const [event] = (await readBy({}, collectionName, searchOptions))
  return event
}

async function lastEventPosition(collectionName){
  const event = await lastEvent(collectionName)
  return get(event, "position", -1)
}

module.exports = {
  lastEvent,
  lastEventPosition
}
