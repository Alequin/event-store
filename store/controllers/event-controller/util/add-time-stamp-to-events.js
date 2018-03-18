
function addTimeStampToEvents(events){
  return events.map((event) => {
    event.timeStamp = timeStamp()
    return event
  })
}

function timeStamp(){
    const date = new Date()

    const year = date.getFullYear()
    const month = formatDateDigits(date.getMonth())
    const day = formatDateDigits(date.getDate())
    const time = date.getTime()

    return `${year}.${month}.${day}.${time}`
}

function formatDateDigits(number){
  const numAsString = number.toString()
  return numAsString.length === 1 ? `0${numAsString}` : numAsString
}

module.exports = addTimeStampToEvents
