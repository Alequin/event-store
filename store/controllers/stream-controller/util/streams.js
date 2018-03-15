
const connect = require("./../../async-mongo/connect")

async function streams(){
  const {database, client} = await connect()
  const collections = await database.collections(null)
  return collections.map((collection) => {
    return collection.s.name
  })
}

module.exports = streams
