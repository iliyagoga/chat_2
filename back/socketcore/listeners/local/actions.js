function onaction(socket,io,r){
    socket.on('@onaction',(req)=>{
        io.in(r.message.room).emit('@setAction',{id:req.id})
    })
}
function offaction(socket,io,r){
    socket.on('@offaction',(req)=>{
        io.in(r.message.room).emit('@deleteAction',{id:req.id})
    })
}
module.exports={onaction,offaction}