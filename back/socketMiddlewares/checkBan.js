const jwt =require('jsonwebtoken')
const { Bans } = require('../models/model')
async function checkBan(socket,next){
    const userid=socket.handshake.auth.id
    const chatid=socket.handshake.chat.chatid
    try {
        const result =await Bans.findOne({where:{user:userid,ChatId:chatid}})
        if(!result){
            next()
        }
        else{
            next(new Error('Вы забанены в этом чате'))
        }

    } catch (error) {
        next(new Error('Вы забанены в этом чате'))
    }

}
module.exports= {checkBan}