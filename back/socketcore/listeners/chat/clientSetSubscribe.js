const { setSubscribe } = require('../../../utils/chat')
function clientSetSubscribe(socket,io){
    socket.on('@clientSetSubscribe',(req)=>{
        setSubscribe(req.chatid,req.userid,io)
    })
}
module.exports={clientSetSubscribe}