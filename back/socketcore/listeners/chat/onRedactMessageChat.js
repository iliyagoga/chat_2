const { redactMessageChat } = require("../../../socketControllers/redactMessage")

function onRedactMessageChat(socket,io,r){
    socket.on('@redactMessageChat',(request)=>{
        redactMessageChat(request.id,io,r.chatid,request.index,request.message,request.files,request.type,request.size)
    })
}
module.exports={onRedactMessageChat}