const { Messages,Files } = require("../models/model")
const uuid =require('uuid')
const fs=require('fs')


async function redactMessageChat(msgid,io,room, index,message,file,type,size){
    try {
        let title=null
        const result=await Messages.update({message:message},{where:{
            id:msgid
        }})
        if(file){
            const result2=await Files.findOne({where:{MessageId:msgid}})
            title=uuid.v4()+'.'+type
            if(!result2){
                const result3=await Files.create({file:uuid.v4()+'.'+type[type.length-1],type:size,MessageId:msgid})
                
                fs.writeFileSync(__dirname+'/../static/'+title,file)

            }
            else{
                const result3=await Files.update({file:uuid.v4()+'.'+type[type.length-1],type:size},{where:{MessageId:msgid}})
                fs.writeFileSync(__dirname+'/../static/'+title,file)
            }
        }
    io.in(room).emit('@redactServerChat',{a:1,index:index,message:message,file:title})
    } catch (error) {
        io.in(room).emit('@redactServerChat',{a:0,error})
        console.log(error)
    }
}
module.exports={redactMessageChat}