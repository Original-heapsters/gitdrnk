const { logger } = require('../../common/Logger');

async function disconnect(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    logger.debug(data);
  });
}

exports.disconnect = disconnect;
