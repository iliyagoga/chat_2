const { Chats } = require("../models/model")
const uuid =require('uuid')
const fs=require('fs')
async function setInfo(req,io){
    const {chatid,name,info,file,type}=req

    try {  
        if(name){
            const r1=await Chats.update({name},{where:{id:chatid}})
        }
        if(info){
            const r1=await Chats.update({info},{where:{id:chatid}})
        }
        if(file){
            const title=uuid.v4()+'.'+type
            const r1=await Chats.update({avatar:title},{where:{id:chatid}})
            fs.writeFileSync(__dirname+'/../static/'+title,file)

        }
        const r2=await Chats.findOne({where:{id:chatid}})
        io.in(chatid).emit('@serverGetInfoChat',{message:r2})
        }
    catch (error) {
        console.log(error)
        io.in(chatid).emit('@serverGetInfoChat',{message:error}) 
    }
}
module.exports={setInfo}