const rabbitMQ = require('amqplib');

const INTERVAL = 1000

function connectionEstablisher(){
  let connection = null
  let closeTimer = 0

  const startConnectionCloseCountDown = () => {
    const intervalId = setInterval(() => {
      closeTimer = closeTimer - 1
      if(closeTimer === 0){
        connection.close()
        connection = null
        clearInterval(intervalId)
      }
    }, INTERVAL)
  }

  return async (openConnectionTime = 10) => {
    closeTimer = openConnectionTime
    if(!connection){
      connection = await rabbitMQ.connect('amqp://localhost')
      startConnectionCloseCountDown()
    }
    return connection
  }
}

module.exports = connectionEstablisher()
