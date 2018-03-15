const rabbitMQ = require('amqplib/callback_api');

const INTERVAL = 1000

function connectionEstablisher(){
  let connection = null
  let closeTimer = 0

  const startConnectionCloseCountDown = (conn) => {
    const intervalId = setInterval(() => {
      closeTimer = closeTimer - 1
      if(closeTimer === 0){
        conn.close()
        conn = null
        clearInterval(intervalId)
      }
    }, INTERVAL)
  }

  return async (openConnectionTime = 10) => {
    return new Promise((resolve, reject) => {
      closeTimer = openConnectionTime
      if(!connection){
        rabbitMQ.connect('amqp://localhost', function(err, connection) {
          if(err) reject(err)
          resolve(connection)
          startConnectionCloseCountDown(connection)
        });
      }else{
        resolve(connection)
      }
    })
  }
}

module.exports = connectionEstablisher()
