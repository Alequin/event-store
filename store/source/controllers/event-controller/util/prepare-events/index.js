
const addTimeStampToEvents = require("./add-time-stamp-to-events")

const {lastEventPosition} = require("./../last-event")
const applyPositionNumbers = require("./apply-position-numbers")

async function prepareEvents(events, collectionName){
  const eventsWithTimeStamp = addTimeStampToEvents(events)
  const prevLastEventPosition = await lastEventPosition(collectionName)
  return applyPositionNumbers(eventsWithTimeStamp, prevLastEventPosition)
}

module.exports = prepareEvents
