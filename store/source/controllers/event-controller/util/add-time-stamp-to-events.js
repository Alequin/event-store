
function addTimeStampToEvents(events){
  return events.map((event) => {
    const newEvent = {...event, timeStamp: timeStamp()}
    return newEvent
  })
}

function timeStamp(date = new Date()){

    const year = date.getFullYear()
    const month = formatDateDigits(date.getMonth()+1)
    const day = formatDateDigits(date.getDate())
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const miliseconds = date.getMilliseconds()

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${miliseconds}`
}

function formatDateDigits(number){
  return number < 10 ? `0${number}` : number.toString()
}

module.exports = addTimeStampToEvents
