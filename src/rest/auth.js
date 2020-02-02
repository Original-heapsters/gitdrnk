const request = require('superagent');
const { logger } = require('../common/Logger');

const {
  GITHUB_KEY,
  GITHUB_SECRET,
  // HOST,
  // PORT,
} = process.env;

async function authenticate(req, res) {
  logger.debug('Starting authentication flow');
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_KEY}`);
}

async function authCallback(req, res) {
  const requestToken = req.query.code;
  const tokenConfig = `client_id=${GITHUB_KEY}`
  + `&client_secret=${GITHUB_SECRET}`
  + `&code=${requestToken}`;

  logger.debug('Requesting oauth token from github');
  const { text } = await request
    .post(`https://github.com/login/oauth/access_token?${tokenConfig}`)
    .set('Accept', 'application/json');

  logger.debug(`OAuth token request succeeded ${text}`);
  res.redirect('http://localhost:8080');
}

exports.authenticate = authenticate;
exports.authCallback = authCallback;
