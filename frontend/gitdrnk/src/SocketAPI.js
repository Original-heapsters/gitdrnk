import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_GITDRNK_SVC);

function joinGame(gameId, username, cb) {
  socket.emit('join', {'game': gameId, 'username': username});
  socket.on('gitdrnk_hook', event => cb(null, event));
}

function joinChat(gameId, username, cb){
  socket.emit('join_chat', {'gameId': gameId, 'username': username});
  socket.on('gitdrnk_chat', message => cb(null, message));
}

function sendChatMessage(gameId, username, message){
  socket.emit('send_chat', {'gameId': gameId, 'username': username, 'message': message});
}
export { joinGame, joinChat, sendChatMessage }
