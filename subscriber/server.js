const express = require('express')
const bodyParser = require('body-parser')

const rabbitMQ = require('amqplib/callback_api');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

rabbitMQ.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'stream-set-1';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received: ", JSON.parse(msg.content));
    }, {noAck: true});
  });
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))
