const {Chats, Subscribers, Users,Local, Messages,Senders, Files, Roles}=require('../models/model')
const {Op, Sequelize} =require('sequelize')
const uuid=require('uuid')
const fs =require('fs')
async function checkOrCreateLocal(req,res){
    const {id1,id2,room}=req.body
    const id=uuid.v4()
    console.log(id1,id2)
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
            const r1=await Local.create({id:room,type:'locale'})
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

async function getMessageLocal(req,res){
    const {LocalId}=req.body
    try {
        const r=await Messages.findAll({where:{LocalId:LocalId},include:[{model: Senders},{model: Files}]})
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
async function createChat(req,res){
    try {
        const {name,info,type,id,vision}=req.body
        console.log(name,info,type,id)
        let file
        if(req.files){
             file=req.files.file
        }
        if(name.length>0){
            const chatid=uuid.v4()
            let title=null
            if(file){
                title=uuid.v4()+'.'+type
                fs.writeFileSync(__dirname+'/../static/'+title,file.data)
            }
            const result=await Chats.findOne({where:{name}})
            if(!result){
                const result1=await Chats.create({id:chatid,name,avatar:title,info,moot: false,type:'chat',vision})
                const result2 =await Subscribers.create({subscriber:id,mode:true,ChatId:chatid})
                const result3 =await Roles.create({role:'admin',UserId:id,ChatId:chatid})
                res.json(true)
            }
            else{
                const result1=await Chats.findOne({where:{name},include:[
                    {model: Users},
                    {model:Roles}
                ]})
                res.json(result1)
            }

        }
        else{
            res.status(404).json('name=NULL')
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
        
    }
}
async function checkSubscribe(req,res){
    const {chatid,userid}=req.body
    try {
        const r1=await Subscribers.findOne({where:{ChatId:chatid,subscriber:userid}})
        res.json(r1?true:false)
    } catch (error) {
        res.status(404).json(error)
    }
}
async function getChatMessages(req,res){
    const {chatid,userid}=req.body
    async function rrr(){
        try {
            const result =await Messages.findAll({where:{ChatId:chatid},include:[{model:Senders}]})
            res.json(result)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    try {
        const r1=await Chats.findOne({where: {id:chatid,vision:false}})
            if(r1){
                const r2 =await Subscribers.findOne({where:{ChatId:chatid,subscriber:userid}})
                if(r2){
                    rrr()
                }
                else{
                    res.status(401).json('Невозможно получить информацию')
                }
            }
            else{
                rrr()
            }
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports={checkOrCreateLocal,getChats,getMessageLocal,getLocalsChats,createChat,checkSubscribe,getChatMessages}