const {Roles}=require('../models/model')

async function checkStatus(req,io,next){
    const {chatid,userid}=req
    try {
        const r= await Roles.findOne({where:{ChatId:chatid,UserId:userid}})
        if(r.role=='admin'){
            next()
        }
    } catch (error) {
        io.in(chatid).emit('@serverGetInfoChat',{message:error}) 
    }
}
module.exports={checkStatus}