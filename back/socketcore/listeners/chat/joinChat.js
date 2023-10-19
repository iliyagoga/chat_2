const { clientDenySubscribe } = require('./clientDenySubscribe')
const { clientSetSubscribe } = require('./clientSetSubscribe')
const { clientGetInfoChat } = require('./clientGetInfoChat')
const { clientSendChat } = require('./clientSendChat')
const { onRedactMessageChat } = require('./onRedactMessageChat')
const { onDeleteMessageChat } = require('./onDeleteMessageChat')
const { setMootClient } = require('./setMootClient')
const { sendInfoClient } = require('./sendInfoClient')
const { setWriteChatClient, denyWriteChatClient } = require('./chatWrite')
const { setBan } = require('./setBan')
const { checkBan } = require('./checkBan')
const { getVision } = require('./vision')

function joinChat(socket,io){
    socket.on('@joinChat',(r)=>{
        socket.join(r.chatid)
        socket.emit('@joinChatOk')
        clientSetSubscribe(socket,io)
        clientDenySubscribe(socket,io)
        clientGetInfoChat(socket,io)
        clientSendChat(socket,io,r)
        onRedactMessageChat(socket,io,r)
        onDeleteMessageChat(socket,io,r)
        setMootClient(socket,io,r)
        sendInfoClient(socket,io,r)
        setWriteChatClient(socket,r)
        denyWriteChatClient(socket,r)
        checkBan(socket,io)
        setBan(socket,io)
        getVision(socket,io)
        

      
    })
}
module.exports={joinChat}