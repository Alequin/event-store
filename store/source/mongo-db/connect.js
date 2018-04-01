const MongoClient = require('mongodb').MongoClient;
const dbName = 'eventstore';
const url = 'mongodb://localhost:27017';

async function connect(collectionName){
  return await new Promise((resolve, reject) => {
    MongoClient.connect(url, async (err, client) => {
      if(err) reject(err)
      const db = client.db(dbName);
      resolve(getResolve(db, client, collectionName))
    })
  })
}

function getResolve(db, client, collectionName){
  if(collectionName){
    const collection = db.collection(collectionName)
    return {database: db, client: client, collection: collection}
  }else{
    return {database: db, client: client}
  }
}

module.exports = connect
