const { connecT } = require("./listeners/connect");
const { createMLRoom } = require("./listeners/createMlRoom");
const { joinRoom } = require('./listeners/local/joinRoom')
const { joinChat } = require('./listeners/chat/joinChat')

function onConnection(socket,io){
    socket.heartbeatTimeout =20

    //инициализация сокетов
    createMLRoom(socket,io)
    connecT(socket,io)

    //обработчики обычной переписки
    joinRoom(socket,io)
    
    //обработчики чата
    joinChat(socket,io)
}
module.exports={onConnection}