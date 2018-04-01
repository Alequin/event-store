const connect = require("./connect")

async function publishToSubscribers(stream, events){
  const connection = await connect()

  const channel = await connection.createChannel()
  await channel.assertQueue(stream, {durable: false});
  events.reverse().forEach((event) => {
    channel.sendToQueue(stream, new Buffer(JSON.stringify(event)))
  })
}

module.exports = publishToSubscribers
