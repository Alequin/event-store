const get = require("lodash/get")
const { readBy } = require("./../../async-mongo/read")

async function lastEvent(collectionName){
  const searchOptions = {sort: {_id: -1}, limit: 1}
  return (await readBy({}, collectionName, searchOptions))
}

async function lastEventPosition(collectionName){
  const event = await lastEvent(collectionName)
  return get(event, "position", -1)
}

module.exports = {
  lastEvent,
  lastEventPosition
}
