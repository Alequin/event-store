
const rabbitMQ = require('amqplib/callback_api');

function subscribe(stream, onEventsReceived){
  rabbitMQ.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      ch.assertQueue(stream, {durable: false});
      ch.consume(stream, function(msg) {
        onEventsReceived(JSON.parse(msg.content));
      }, {noAck: true});
    });
  });
}

module.exports = subscribe
