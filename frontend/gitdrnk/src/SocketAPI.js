import openSocket from 'socket.io-client';
let app_socket = null

function joinChat(gameId, email, chat_cb, action_cb){
  app_socket = openSocket(process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000");
  app_socket.on('gitdrnk_action', action => action_cb(null, action));
  app_socket.on('gitdrnk_chat', message => chat_cb(null, message));
  app_socket.emit('join_chat', {'gameId': gameId, 'email': email, 'dateTime': getDateTime()});
}

function leaveChat(gameId, email){
  app_socket.emit('leave_chat', {'gameId': gameId, 'email': email, 'dateTime': getDateTime()});
  app_socket.removeListener('gitdrnk_chat');
  app_socket.removeListener('gitdrnk_action');
  app_socket = null;
}

function sendChatMessage(gameId, email, message){
  app_socket.emit('send_chat', {'gameId': gameId, 'email': email, 'message': message, 'dateTime': getDateTime()});
}

function getDateTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}

export { joinChat, leaveChat, sendChatMessage }
