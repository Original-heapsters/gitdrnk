import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_GITDRNK_SVC);

function joinGame(gameId, username, cb) {
  socket.emit('join', {'game': gameId, 'username': username});
  socket.on('gitdrnkevent', event => cb(null, event));
}
export { joinGame }
