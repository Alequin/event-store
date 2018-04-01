
const addTimeStampToEvents = require("./add-time-stamp-to-events")

const {lastEventPosition} = require("./last-event")

async function prepareEvents(events, collectionName){
  const eventsWithTimeStamp = addTimeStampToEvents(events)
  const prevLastEventPosition = await lastEventPosition(collectionName)
  return applyPositionNumbers(eventsWithTimeStamp, prevLastEventPosition)
}

function applyPositionNumbers(events, lastPosition){
  const next = lastPosition + 1
  return events.map((event, index) => {
    const newEvent = {...event, position: next + index}
    return newEvent
  })
}

module.exports = prepareEvents
