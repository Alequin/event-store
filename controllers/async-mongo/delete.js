const connect = require("./../../mongo-db/connect")

const notArrayMessage = "first argument must be an array of elements"

async function deleteAll(collectionName){
  return await deleteBy({}, collectionName)
}

async function deleteBy(filter, collectionName){
  const {client, collection} = await connect(collectionName)
  const result = new Promise((resolve, reject) => {
    collection.deleteMany(filter, function(err, result) {
      if(err) reject(err)
      resolve(result)
    });
  })
  client.close()
  return result
}

module.exports = {
  deleteAll: deleteAll,
  deleteBy: deleteBy
}
