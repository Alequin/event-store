
const connect = require("./../../../mongo-db/connect")

async function streamNames(){
  const {database, client} = await connect()
  const collections = await database.collections(null)
  return collections.map(extractStreamName)
}

function extractStreamName({s: {name: streamName}}){
  return streamName
}

module.exports = streamNames
