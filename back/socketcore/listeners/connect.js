function connecT(socket,io){
    socket.on('@connect',(req)=>{
        socket.on('disconnect',(r)=>{
            io.emit("@disconnected-server",{req})
        })
    })
}
module.exports={connecT}