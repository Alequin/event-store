const last = require("lodash/last")

function prepareNewEvents(events, lastPosition){
  const eventsWithTailBool = applyTailBool(events)
  return applyPositionNumbers(eventsWithTailBool, lastPosition)
}

function applyTailBool(events){
  const tailEvent = {...last(events), tail: true}
  return swapLastElementFor(tailEvent, events)
}

function swapLastElementFor(newLast, array){
  const otherEvents = array.slice(0, array.length-1)
  return [...otherEvents, newLast]
}

function applyPositionNumbers(events, lastPosition){
  const next = lastPosition + 1
  return events.map((event, index) => {
    const eventCopy = {...event}
    eventCopy.position = next + index
    return eventCopy
  })
}

module.exports = prepareNewEvents
