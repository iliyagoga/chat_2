const { Chats } = require("../models/model")

async function setMoot(req,io){
    const {chatid,value,check}=req

    try {  
        if(check=='admin'){
            const r1=await Chats.update({moot:value},{where:{id:chatid}})
            const r2=await Chats.findOne({where:{id:chatid}})
            io.in(chatid).emit('@serverGetInfoChat',{message:r2})
        }
        else{
            io.in(chatid).emit('@serverGetInfoChat',{message:false}) 
        }
       
    }
    catch (error) {
        console.log(error)
        io.in(chatid).emit('@serverGetInfoChat',{message:error}) 
    }
}
module.exports={setMoot}