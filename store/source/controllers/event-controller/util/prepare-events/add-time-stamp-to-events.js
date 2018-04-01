const time = require("./time")

function addTimeStampToEvents(events){
  return events.map((event) => {
    return {...event, timeStamp: time()}
  })
}

module.exports = addTimeStampToEvents
