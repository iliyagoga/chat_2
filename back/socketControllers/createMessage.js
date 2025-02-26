const { Messages, Senders } = require("../models/model")

async function createMessage(message,ChatId,sender,msgid){
    try {
        const r=await Messages.create({id: msgid,message,ChatId},)
        const r2=await Senders.create({sender:sender,MessageId:msgid})
        return true
    } catch (error) {
        console.log(error)
        
    }
}
module.exports={createMessage}