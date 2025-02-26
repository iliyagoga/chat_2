const { getInfoChat } = require("../../../utils/chat")

function clientGetInfoChat(socket,io){
    socket.on('@clientGetInfoChat',(req)=>{
        getInfoChat(req.chatid,io)
    })
}
module.exports={clientGetInfoChat}