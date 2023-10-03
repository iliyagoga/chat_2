const fs=require('fs')
const uuid=require('uuid');
const { createMessageLocal } = require('../../../utils/createMessage');

function sendClient(socket,io,r){
    socket.on('@sendClient',(req)=>{
        
        const messID=uuid.v4()
        let title=null

        createMessageLocal(
            {message:req.message,
                recipient:req.recipient,
                LocalId:r.message.room,
                sender:req.id,
                msgid:messID
            })
        if(req.files){
            title=uuid.v4()+'.'+req.type[req.type.length-1]
            fs.writeFileSync(__dirname+'/static/'+title,req.files)
            const re=createFile(title,messID,req.size)
            if(!re){
                title=null
            }
        }
        io.in(r.message.room).emit('@sendServer',{
            message:req.message,
            id:req.id,
            LocalId:r.message.room,
            msgid:messID,
            file:title,
        })
        io.in('@home'+r.message.personId).emit('@sendServer2',{
            message: req.message,
            chatId: r.message.chatId,
            nickname: r.message.nickname,
            avatar: r.message.myavatar,
            id: req.id,
            room: r.message.room,
            type:'local'
            
            
        })
    })
}
module.exports={sendClient}