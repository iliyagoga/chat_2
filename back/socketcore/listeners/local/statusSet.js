function statusSet(socket,io,r){
    socket.on('@statusSet',(req)=>{
        io.in(r.message.room).emit('@statusSetServer')})  
}
module.exports={statusSet}