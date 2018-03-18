const connect = require("./../../mongo-db/connect")

async function update(toUpdate, newValue, collectionName){
  const {client, collection} = await connect(collectionName)
  const result = await new Promise((resolve, reject) => {
    collection.updateOne(toUpdate, newValue, function(err, docs) {
      if(err) reject(err)
      resolve(docs)
    });
  })
  client.close()
  return result
}

module.exports = update
