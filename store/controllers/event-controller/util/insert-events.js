
const insert = require("./../../async-mongo/insert")
const update = require("./../../async-mongo/update")

const addTimeStampToEvents = require("./add-time-stamp-to-events")

const {lastEventPosition} = require("./last-event")

async function insertEvents(events, collectionName){
  const eventsWithTimeStamp = addTimeStampToEvents(events)
  const prevLastEventPosition = await lastEventPosition(collectionName)
  const eventsToInsert = applyPositionNumbers(eventsWithTimeStamp, prevLastEventPosition)
  return await insert(eventsToInsert, collectionName)
}

function applyPositionNumbers(events, lastPosition){
  const next = lastPosition + 1
  return events.map((event, index) => {
    const newEvent = {...event, position: next + index}
    return newEvent
  })
}

module.exports = insertEvents
