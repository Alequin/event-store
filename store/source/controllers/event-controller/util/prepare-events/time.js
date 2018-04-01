const times = require("lodash/times")

function time(date = new Date()){

    const year = date.getUTCFullYear()
    const month = formatDigits(date.getUTCMonth()+1, 2)
    const day = formatDigits(date.getUTCDate(), 2)
    const hours = formatDigits(date.getUTCHours(), 2)
    const minutes = formatDigits(date.getUTCMinutes(), 2)
    const seconds = formatDigits(date.getUTCSeconds(), 2)
    const miliseconds = formatDigits(date.getUTCMilliseconds(), 3)

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${miliseconds}-UTC`
}

function formatDigits(number, digitCount){
  const numberLength = number.toString().length
  const digitsToAdd = digitCount - numberLength
  return `${zeroPrefix(digitsToAdd)}${number}`
}

function zeroPrefix(amount){
  return times(amount, () => '0').join("")
}

module.exports = time
