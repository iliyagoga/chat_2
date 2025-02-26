const { Subscribers } = require("../models/model")

async function getMembers(req){
    const {chatid}=req
    try {
        const r1=await Subscribers.findAll({where:{ChatId:chatid},attributes:['subscriber'],raw: true})
        return r1
        
    } catch (error) {
        return error
    }
}
module.exports={getMembers}