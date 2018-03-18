const reject = require("lodash/reject")

const REQUIRED_FIELDS = ["type", "data", "aggregateId"]

function validateEvents(events){
  const invalidEvents = reject(events, containsAllRequireFields)
  if(invalidEvents.length === 0) return {areEventsValid: true, errors: null}

  const errorMessages = invalidEvents.map((event) => {
    return missingFieldsErrorMessage(event)
  })
  return {areEventsValid: false, errors: errorMessages}
}

function containsAllRequireFields(event){
  return identifyMissingFields(event).length === 0
}

function missingFieldsErrorMessage(event){
  const missingFields = identifyMissingFields(event)
  return `Missing Fields: ${missingFields.join(", ")}
    Event: ${JSON.stringify(event)}`
}

function identifyMissingFields(event){
  return REQUIRED_FIELDS.filter((field) => {
    return !event[field]
  })
}



module.exports = validateEvents
