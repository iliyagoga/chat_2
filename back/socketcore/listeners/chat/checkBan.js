const { Bans } = require("../../../models/model")

async function checkBan(socket,io){
        socket.on('@checkMoot',(r)=>{
            const chatid=r.chatid
            Bans.findOne({where:{UserId:r.id,ChatId:chatid}}).then(result=>{
                if(result){
                    io.emit('@getMoot',{ban:true,id:r.id})
                }else{
                    io.emit('@getMoot',{ban:false,id:r.id})
                }
               
                })
        })
}
module.exports={checkBan}