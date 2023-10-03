const { createMessage } = require("../../../socketControllers/createMessage")
const { getMembers } = require("../../../utils/getMembers")
const { createFile } = require('../../../utils/createFile')
const fs=require('fs')
const uuid=require('uuid');

function clientSendChat(socket,io,r){
    socket.on('@sendClientChat',(req)=>{
        const messID=uuid.v4()
        createMessage(req.message,r.chatid,req.userId,messID)
            if(req.files){
                title=uuid.v4()+'.'+req.type[req.type.length-1]
                fs.writeFileSync(__dirname+'/static/'+title,req.files)
                const re=createFile(title,messID,req.size)
                if(!re){
                    title=null
                }
                io.in(r.chatid).emit('@sendServerChat',{message:req.message,myinfo:req.myinfo,userId:req.userId,msgid:messID,file:title})
                const members=getMembers({chatid:r.chatId})
            }
            else{
                io.in(r.chatid).emit('@sendServerChat',{message:req.message,myinfo:req.myinfo,userId:req.userId,msgid:messID})
                getMembers({chatid:r.chatid}).then(re=>{
                    for(let i of re){
                        io.in('@home'+i.subscriber).emit('@sendServer2',{
                            message:req.message,
                            name: req.chatInfo.name,
                            avatar: req.chatInfo.avatar,
                            room: r.chatid,
                            type:'chat'
                        })
                    }
                   
                })

            }
    })
}
module.exports={clientSendChat}