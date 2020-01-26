const { logger } = require('../common/Logger');

async function home(req, res) {
  logger.debug(`Index ${req} ${res}`);
  res.send('Success');
}

exports.home = home;
