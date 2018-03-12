const connect = require("./mongo-db/connect")

const run = (async () => {
  const {database, client} = await connect()
  database.dropDatabase()
  client.close()
})()
