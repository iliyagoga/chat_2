function createMLRoom(socket){
    socket.on('@createMLRoom',(req)=>{
        socket.join('@home'+req.message)
    })
}
module.exports={createMLRoom}