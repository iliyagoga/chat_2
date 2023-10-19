const {Chats, Subscribers, Users,Local, Messages,Senders, Files, Roles, Bans}=require('../models/model')
const {Op, Sequelize} =require('sequelize')
const uuid=require('uuid')
const fs =require('fs')
const { one, two } = require('../utils/getLocalCHatFuncs')
async function checkOrCreateLocal(req,res){
    const {id1,id2,room}=req.body
    const id=uuid.v4()
    if(id1 &&id2 &&id1!=undefined && id2!=undefined){
        if(id1!=id2){
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
        }
        else{
            res.status(404) 
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
        const r=await Messages.findAll({where:{LocalId:LocalId},include:[{model: Senders},{model: Files}],order:[['createdAt','ASC']]})
        res.json(r)

    } catch (error) {
        console.log(error)
        
    }
}
async function getLocalsChats(req,res){
   const r1= await one(req)
   const r2= await two(req)
   const r3=[...r1,...r2].sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }

    return 0;
  })
   res.json(r3)

}
async function createChat(req,res){
    try {
        const {name,info,type,id,vision}=req.body
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
    const {chatid}=req.body
    try {
        const result =await Messages.findAll({where:{ChatId:chatid},include:[{model:Senders},{model: Files}],order:[['createdAt','ASC']]})
        res.json(result)
    } catch (error) {
        res.status(404).json(error)
    }
}
async function getAllMembers(req,res){
    const {chatid}=req.body
    try {
        const r1=await Subscribers.findAll({where:{ChatId:chatid},attributes:['subscriber'],raw: true})
        const r11=r1.map(v=>{return v.subscriber})
        const result =await Users.findAll({where:{id:r11},attributes:['id','name','sername','date','nickname','avatar','phone'],include:[{model:Roles},{model:Bans}]})
        res.json(result)
        
    } catch (error) {
        res.status(404).json(error)
    }
}

async function getPerson(req,res){
    const {pid} =req.body
    try {
        const result =await Users.findOne({where:{id:pid},attributes:['name','avatar','nickname','sername','date','phone']})
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

module.exports={checkOrCreateLocal,getChats,getMessageLocal,getLocalsChats,createChat,checkSubscribe,getChatMessages,getAllMembers,getPerson}