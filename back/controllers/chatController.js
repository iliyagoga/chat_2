const {Chats, Subscribers, Users,Local, Messages,Senders, Recipients}=require('../models/model')
const {Op, Sequelize} =require('sequelize')
const uuid=require('uuid')
async function checkOrCreateLocal(req,res){
    const {id1,id2,room}=req.body
    console.log(id1,id2,room)
    const id=uuid.v4()
    if(id1 &&id2 &&id1!=undefined && id2!=undefined){
    try {
        const result=await Subscribers.findAll({
            where: {
                subscriber:[id1,id2],
                mode:false
            },
            attributes: ['LocalId'],
            group: ['LocalId'],
            having: Sequelize.literal('COUNT(*) > 1')
            })
        if(result.length==0){
            const r1=await Local.create({id:room})
            const r2=await Subscribers.create({LocalId:room,subscriber:id1,mode:false})
            const r3=await Subscribers.create({LocalId:room,subscriber:id2,mode:false})
            res.json(r2)
        }
        else{

            res.json(result[0])
        }

        
        
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
    }else{
        res.status(404)
    }

}
async function getChats(req,res){
    const {userid}=req.body
try {
    const result=await Local.findAll({
        where: {
            subscribers:{
                [Op.regexp]: userid
            }
        }
})
    res.json(result)
} catch (error) {
    res.status(404).json(error)
}
}
async function createMessageLocal(req,res){
    const {message,recipient,LocalId,sender}=req.body
    const messID=uuid.v4()
    try {
        const r=await Messages.create({id: messID,message,LocalId:LocalId},)
        const r2=await Senders.create({sender:sender,MessageId:messID})
        const r3=await Recipients.create({recipient:recipient,MessageId:messID})
        res.json(r)

    } catch (error) {
        console.log(error)
        
    }
}

async function getMessageLocal(req,res){
    const {LocalId}=req.body
    try {
        const r=await Messages.findAll({where:{LocalId:LocalId},include:[{model: Senders}]})
        res.json(r)

    } catch (error) {
        console.log(error)
        
    }
}
async function getLocalsChats(req,res){
    const {sender}=req.body
    try {
        const r1=await Subscribers.findAll({where: {subscriber:sender}})
        
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
                            return {room: r.LocalId,nickname:av.nickname,avatar:av.avatar,message:r.message,id: v.subscriber}
                        }
                })
                const result= await Promise.all(arr)
                res.json(result)
            }
            else{
                res.json([])
            }
        }
        else{
            res.json([])
        }
        
        
        
        
       

    } catch (error) {
        console.log(error)
        
    }
}
module.exports={checkOrCreateLocal,getChats,createMessageLocal,getMessageLocal,getLocalsChats}