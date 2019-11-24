import openSocket from 'socket.io-client';
let app_socket = null

function joinChat(gameId, email, chat_cb, action_cb, action_update_cb){
  app_socket = openSocket(process.env.REACT_APP_GITDRNK_SVC || "http://localhost:5000");
  app_socket.on('gitdrnk_action', action => action_cb(null, action));
  app_socket.on('gitdrnk_action_update', action => action_update_cb(null, action));
  app_socket.on('gitdrnk_chat', message => chat_cb(null, message));
  app_socket.emit('join_chat', {'gameId': gameId, 'email': email, 'dateTime': getDateTime()});
}

function leaveChat(gameId, email){
  app_socket.emit('leave_chat', {'gameId': gameId, 'email': email, 'dateTime': getDateTime()});
  app_socket.removeListener('gitdrnk_chat');
  app_socket.removeListener('gitdrnk_action');
  app_socket.removeListener('gitdrnk_action_update');
  app_socket = null;
}

function sendChatMessage(gameId, email, message){
  app_socket.emit('send_chat', {'gameId': gameId, 'email': email, 'message': message, 'dateTime': getDateTime()});
}

function getDateTime(){
  var today = new Date();
  var dateString = today.getFullYear() + '-'
                   + ('0' + (today.getMonth()+1)).slice(-2) + '-'
                   + ('0' + today.getDate()).slice(-2)

  var timeString = ('0' + today.getHours()).slice(-2) + ':'
             + ('0' + (today.getMinutes())).slice(-2) + ':'
             + ('0' + (today.getSeconds())).slice(-2);
  // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateString + 'T' + timeString;
  return dateTime;
}

export { joinChat, leaveChat, sendChatMessage }
