const { denySubscribe } = require("../../../utils/chat")

function clientDenySubscribe(socket,io){
    socket.on('@clientDenySubscribe',(req)=>{
        denySubscribe(req.chatid,req.userid,io)
    })
}
module.exports={clientDenySubscribe}