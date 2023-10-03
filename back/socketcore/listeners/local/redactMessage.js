const { redactMessage } = require("../../../utils/redactMessage")

function redactMessageListener(socket,io,r){
    socket.on('@redactMessage',(req)=>{
        redactMessage(req.id,io,r.message.room,req.index,req.message,req.files,req.type,req.size)
    })  
}
module.exports={redactMessageListener}