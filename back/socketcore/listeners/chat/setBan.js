const { Roles, Bans } = require("../../../models/model")

async function setBan(socket,io){
        socket.on('@setMoot',(r)=>{
            const chatid=r.chatid
            const myid=socket.handshake.auth.id
            Roles.findOne({where:{ChatId:chatid,UserId:myid}}).then(res=>{
                if(res.role=='admin'){
                    Bans.findOne({where:{UserId:r.id,ChatId:chatid}}).then(result=>{
                        if(result){
                            Bans.destroy({where:{UserId:r.id,ChatId:chatid}}).then((re)=>{
                                io.emit('@getMoot2',{ban:false,id:r.id})
                            })
                        }
                        else{
                            Bans.create({UserId:r.id,ChatId:chatid}).then((re)=>{
                                io.emit('@getMoot2',{ban:true,id:r.id})
                            })
                            
                        }
                    })
                }
            })
                
           
            
            
        })


   
}
module.exports={setBan}