const { Messages, Senders, Recipients } = require("../models/model")

async function createMessageLocal(req){
    const {message,recipient,LocalId,sender,msgid}=req
    try {
        const r=await Messages.create({id: msgid,message,LocalId:LocalId},)
        const r2=await Senders.create({sender:sender,MessageId:msgid})
        const r3=await Recipients.create({recipient:recipient,MessageId:msgid})

    } catch (error) {
        console.log(error)
        
    }
}
module.exports={createMessageLocal}