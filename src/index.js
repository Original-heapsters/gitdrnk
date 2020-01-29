require('dotenv/config');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { logger } = require('./common/Logger');

// Rest routes
const { home } = require('./rest/index');
const { authenticate, authCallback } = require('./rest/auth');

// Socket routes
const { connect } = require('./socket/connections/connect');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.get('/', home);
app.get('/auth/github', authenticate);
app.get('/auth/github/callback', authCallback);

io.on('connection', connect);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';
server.listen(PORT, HOST, () => {
  logger.info(`Gitdrnk backend service running on ${HOST}:${PORT}`);
});
