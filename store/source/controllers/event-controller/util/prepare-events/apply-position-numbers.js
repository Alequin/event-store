function applyPositionNumbers(events, lastPosition){
  if(lastPosition < -1) throw Error(`last lastPosition cannot be less than -1: ${lastPosition}`)

  const next = lastPosition + 1
  return events.map((event, index) => {
    return {...event, position: next + index}
  })
}

module.exports = applyPositionNumbers
