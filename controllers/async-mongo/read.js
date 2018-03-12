const connect = require("./../../mongo-db/connect")

async function readAll(collectionName, options = {}){
  return await readBy({}, collectionName, options)
}

async function readBy(filter, collectionName, options = {}){
  const {client, collection} = await connect(collectionName)
  const result = await new Promise((resolve, reject) => {
    collection.find(filter, options).toArray(function(err, docs) {
      if(err) reject(err)
      resolve(docs)
    });
  })
  client.close()
  return result
}

module.exports = {
  readAll,
  readBy
}
