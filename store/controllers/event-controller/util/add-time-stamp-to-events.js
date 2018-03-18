
function addTimeStampToEvents(events){
  return events.map((event) => {
    event.timeStamp = new Date().toString()
    return event
  })
}

module.exports = addTimeStampToEvents
