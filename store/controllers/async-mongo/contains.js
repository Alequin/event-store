const {readBy} = require("./read")

async function contains(filter, collectionName){
  const results = await readBy(filter, collectionName)
  return results.length >= 1
}

module.exports = contains
