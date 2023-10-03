const { Subscribers, Chats, Roles } = require("../models/model")

async function setSubscribe(chatid,userid,io){
    try {
        const r1=await Subscribers.create({ChatId:chatid,subscriber:userid,mode:true})
        const r2=await Roles.create({ChatId:chatid,UserId:userid,role:'subscriber'})
        io.in(chatid).emit('@serverSetSubscribe',{message:r1})
    } catch (error) {
        io.in(chatid).emit('@serverSetSubscribe',{message:error}) 
    }
    }

async function denySubscribe(chatid,userid,io){
        try {
            const r1=await Subscribers.destroy({where:{ChatId:chatid,subscriber:String(userid)}})
            const r3=await Roles.findOne({where: {ChatId:chatid,UserId:userid}})
            if(r3.role!='admin'){
                const r2=await Roles.destroy({where:{ChatId:chatid,UserId:userid}})
            }
            
            io.in(chatid).emit('@serverDenySubscribe',{message:r1})
        } catch (error) {
            io.in(chatid).emit('@serverDenySubscribe',{message:error}) 
        }
        }
async function getInfoChat(chatid,io){
    try {
        const r1=await Chats.findOne({where:{id:chatid},attributes:['avatar','name','moot','vision','info']})
        io.in(chatid).emit('@serverGetInfoChat',{message:r1})
    }
    catch (error) {
        console.log(error)
        io.in(chatid).emit('@serverGetInfoChat',{message:error}) 
    }
    }
module.exports={setSubscribe,denySubscribe,getInfoChat}