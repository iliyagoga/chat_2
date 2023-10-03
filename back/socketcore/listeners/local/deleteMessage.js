const { deleteMessage } = require("../../../utils/deleteMessage")

function deleteMessageListener(socket,io){
    socket.on('@deleteMessage',(r)=>{
        deleteMessage(r.msgid,io,r.room,r.index)
})
}
module.exports={deleteMessageListener}