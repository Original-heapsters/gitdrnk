import openSocket from 'socket.io-client';
const app_socket = openSocket(process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000");

function joinGame(gameId, email, cb) {
  app_socket.emit('join', {'game': gameId, 'email': email});
}

function joinChat(gameId, email, chat_cb, action_cb){
  app_socket.emit('join_chat', {'gameId': gameId, 'email': email});
  app_socket.on('gitdrnk_action', action => action_cb(null, action));
  app_socket.on('gitdrnk_chat', message => chat_cb(null, message));
}

function leaveChat(gameId, email){
  app_socket.emit('leave_chat', {'gameId': gameId, 'email': email});
  app_socket.removeListener('gitdrnk_chat');
  app_socket.removeListener('gitdrnk_action');
}

function sendChatMessage(gameId, email, message){
  app_socket.emit('send_chat', {'gameId': gameId, 'email': email, 'message': message});
}

export { joinGame, joinChat, leaveChat, sendChatMessage }
