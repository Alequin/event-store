const connect = require("./connect")

const notArrayMessage = "first argument must be an array of elements"

async function insert(data, collectionName){
  if(!Array.isArray(data)) throw new Error(notArrayMessage)

  const {client, collection} = await connect(collectionName)
  const result = await new Promise((resolve, reject) => {
    collection.insertMany(data, function(err, result) {
      if(err) reject(err)
      resolve(result)
    });
  })
  client.close()
  return result
}

module.exports = insert
