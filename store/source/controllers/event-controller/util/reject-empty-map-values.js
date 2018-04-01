const reduce = require("lodash/reduce")

function rejectEmptyMapValues(searchOptions){
  return reduce(searchOptions, (accumulator, value, key) => {
    if(!value) return accumulator
    return {...accumulator, [key]: value}
  }, {})
}

module.exports = rejectEmptyMapValues
