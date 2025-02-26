const { deleteMessageChat } = require("../../../socketControllers/deleteMessage")

function onDeleteMessageChat(socket,io,r){
    socket.on('@deleteMessageChat',(request)=>{
        deleteMessageChat(request.msgid,io,r.chatid,request.index)
    })
}
module.exports={onDeleteMessageChat}