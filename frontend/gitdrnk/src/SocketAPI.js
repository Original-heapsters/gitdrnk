import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_GITDRNK_SVC|| "http://localhost:5000");

function joinGame(gameId, username, cb) {
  socket.emit('join', {'game': gameId, 'username': username});
}

function joinChat(gameId, username, chat_cb, action_cb){
  socket.emit('join_chat', {'gameId': gameId, 'username': username});
  socket.on('gitdrnk_action', action => action_cb(null, action));
  socket.on('gitdrnk_chat', message => chat_cb(null, message));
}

function sendChatMessage(gameId, username, message){
  socket.emit('send_chat', {'gameId': gameId, 'username': username, 'message': message});
}
export { joinGame, joinChat, sendChatMessage }
