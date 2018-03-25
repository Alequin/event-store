
function addTimeStampToEvents(events){
  return events.map((event) => {
    const newEvent = {...event, timeStamp: timeStamp()}
    return newEvent
  })
}

function timeStamp(){
    const date = new Date()

    const year = date.getFullYear()
    const month = formatDateDigits(date.getMonth()+1)
    const day = formatDateDigits(date.getDate())
    const time = date.getTime()

    return `${year}-${month}-${day}-${time}`
}

function formatDateDigits(number){
  return number < 10 ? `0${number}` : number.toString()
}

module.exports = addTimeStampToEvents
