const githubOAuth = require('github-oauth');
const { logger } = require('../common/Logger');

const {
  GITHUB_KEY,
  GITHUB_SECRET,
  HOST,
  PORT,
} = process.env;
const auth = githubOAuth(
  {
    githubClient: GITHUB_KEY,
    githubSecret: GITHUB_SECRET,
    baseURL: `http://${HOST}:${PORT}`,
    loginURI: '/auth/github',
    callbackURI: '/auth/github/callback',
  },
);

auth.on('error', (err) => {
  logger.error('Error during auth', { err });
});

auth.on('token', (token, extResponse) => {
  extResponse.end(JSON.stringify(token));
});

async function authenticate(req, res) {
  logger.debug('Started oauth');
  return auth.login(req, res);
}

async function authCallback(req, res) {
  logger.debug('Received callback');
  return auth.callback(req, res);
}

exports.authenticate = authenticate;
exports.authCallback = authCallback;
