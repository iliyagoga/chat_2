const { redactMessageListener } = require("./redactMessage");
const { deleteMessageListener } = require("./deleteMessage");
const { statusSet } = require("./statusSet");
const { onaction, offaction } = require("./actions");
const { clientSubscribe } = require("./clientSubscribe");
const { sendClient } = require("./sendClient");
function joinRoom(socket,io){
    socket.on('@joinRoom',(r)=>{
        socket.join(r.message.room)

        io.in(r.message.room).emit('@status',{message:r.message.myid})

        statusSet(socket,io,r)
        deleteMessageListener(socket,io)
        redactMessageListener(socket,io,r)
        clientSubscribe(socket,io,r)
        sendClient(socket,io,r)
        onaction(socket,io,r)
        offaction(socket,io,r)
    })
}
module.exports={joinRoom}