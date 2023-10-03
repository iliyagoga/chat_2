const { Messages, Recipients, Senders, Files } = require("../models/model")
const fs=require('fs')

async function deleteMessageChat(msgid,io,room, index){
    console.log(msgid)
    try {
        const get=await Files.findOne({where:{MessageId:msgid}})
        const result4=await Files.destroy({where:{
            MessageId:msgid
        }})
        const result=await Messages.destroy({where:{
            id:msgid
        },})
        const result2=await Senders.destroy({where:{
            MessageId:msgid
        }})
        const result3=await Recipients.destroy({where:{
            MessageId:msgid
        }})
        
        
        if(get)
        fs.unlink(__dirname+'/../static/'+get.file,(r)=>{console.log(r)})
    io.in(room).emit('@deleteServerChat',{a:1,index:index})
    } catch (error) {
        io.in(room).emit('@deleteServerChat',{a:0,error})
        console.log(error)
    }
}
module.exports={deleteMessageChat}