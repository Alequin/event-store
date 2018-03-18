
const connect = require("./../../../mongo-db/connect")

async function streamNames(){
  const {database, client} = await connect()
  const collections = await database.collections(null)
  return collections.map((collection) => {
    return collection.s.name
  })
}

module.exports = streamNames
