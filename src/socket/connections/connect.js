const { logger } = require('../../common/Logger');

async function connect(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    logger.debug(data);
  });
}

exports.connect = connect;
