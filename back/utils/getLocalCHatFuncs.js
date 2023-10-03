const { Op } = require("sequelize")
const { Subscribers, Messages, Users, Chats } = require("../models/model")

async function one(req){
    const {sender}=req.body
    try {
        const r1=await Subscribers.findAll({where: {subscriber:sender,LocalId: {[Op.not]:null}}})
        if(r1.length!=0){
            const idsLocals=r1.map(v=>{return v.LocalId})
            const r2=await Subscribers.findAll({where: {subscriber:{[Op.not]:sender},LocalId:[...idsLocals]}})
            let arr=[]
            const check =await Messages.findOne({where:{LocalId:idsLocals[0]}})
            if(check){
                arr= r2.map(async v=>{
                    const r = await Messages.findOne(
                        {
                            where: {
                                LocalId: v.LocalId
                            },
                            order: [['createdAt', 'DESC']]
                        }
                     
                    )
                        if(r){
                            const av=await Users.findOne({where:{id:Number(v.subscriber)}})
                            return {room: r.LocalId,nickname:av.nickname,avatar:av.avatar,message:r.message,id: v.subscriber,c: new Date(v.createdAt).getTime(),type:'local'}
                        }
                })
                const result= await Promise.all(arr)
                return(result)
            }
            else{
                return([])
            }
        }
        else{
            return([])
        }
    } catch (error) {
        console.log(error)
        
    }
}

async function two(req){
    const {sender}=req.body
    try {
        const r1=await Subscribers.findAll({where: {subscriber:sender,ChatId: {[Op.not]:null}}})
        if(r1.length!=0){
            const idsChats=r1.map(v=>{return v.ChatId})
            const r2=await Subscribers.findAll({where: {subscriber:sender,ChatId:[...idsChats]}})
            let arr=[]

                arr= r2.map(async v=>{
                    const r = await Messages.findOne(
                        {
                            where: {
                                ChatId: v.ChatId
                            },
                            order: [['createdAt', 'DESC']]
                        }
                     
                    )
                        if(r){
                            const av=await Chats.findOne({where:{id:v.ChatId}})
                            return {room: r.ChatId,name:av.name,avatar:av.avatar,message:r.message,c:new Date(r.createdAt).getTime(),type:'chat'}
                        }
                })
                const result= await Promise.all(arr)

                return result
        
           
            
        }
        else{
            return([])
        }
    } catch (error) {
        console.log(error)
        
    }
}
module.exports={one,two}