function setWriteChatClient(socket,r){
    socket.on('@setWriteChatClient',(request)=>{
        socket.broadcast.to(r.chatid).emit('@setWriteChatServer',{request})
    })
}
function denyWriteChatClient(socket,r){
    socket.on('@denyWriteChatClient',(request)=>{
        socket.broadcast.to(r.chatid).emit('@denyWriteChatServer',{request})
    })
}
module.exports={setWriteChatClient,denyWriteChatClient}