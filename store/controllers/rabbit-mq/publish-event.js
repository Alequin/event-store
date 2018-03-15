const connect = require("./connect")

async function publish(stream, events){
  const connection = await connect()

  connection.createChannel(function(err, channel) {
    channel.assertQueue(stream, {durable: false});
    events.forEach((event) => {
      channel.sendToQueue(stream, new Buffer(JSON.stringify(event)))
    })
  });
}

module.exports = publish
