function clientSubscribe(socket,io,r){
    socket.on('@clientSubscribe',(req)=>{
        subscribe(req.chatid.req.userid,io,r.message.room)
    })
}
module.exports={clientSubscribe}