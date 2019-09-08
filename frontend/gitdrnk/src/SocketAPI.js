import openSocket from 'socket.io-client';
const socket = openSocket(process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000");

function joinGame(gameId, email, cb) {
  socket.emit('join', {'game': gameId, 'email': email});
}

function joinChat(gameId, email, chat_cb, action_cb){
  socket.emit('join_chat', {'gameId': gameId, 'email': email});
  socket.on('gitdrnk_action', action => action_cb(null, action));
  socket.on('gitdrnk_chat', message => chat_cb(null, message));
}

function leaveChat(gameId, email){
  console.log(gameId);
  console.log(email);
  socket.emit('leave_chat', {'gameId': gameId, 'email': email});
  socket.removeListener('gitdrnk_chat');
  socket.removeListener('gitdrnk_action');
}

function sendChatMessage(gameId, email, message){
  socket.emit('send_chat', {'gameId': gameId, 'email': email, 'message': message});
}
export { joinGame, joinChat, leaveChat, sendChatMessage }
