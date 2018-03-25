const connect = require("./connect")

async function publishToSubscribers(stream, events){
  const connection = await connect()

  connection.createChannel(function(err, channel) {
    channel.assertQueue(stream, {durable: false});
    events.reverse().forEach((event) => {
      channel.sendToQueue(stream, new Buffer(JSON.stringify(event)))
    })
  });
}

module.exports = publishToSubscribers
