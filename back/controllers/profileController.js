const { Users } = require("../models/model")
const jwt=require('jsonwebtoken')
const uuid=require('uuid')
const checkFile=require('../utils/checkType')
const path=require('path')
const { cpSync } = require("fs")
async function setInfo(req,res){
    let {id,name,sername,nickname,date,phone,oldavatar}=req.body
    if(nickname.length==0){
        res.status(404).json('Ник не должен быть пустым')
    }
    else{
        if(phone.length==0){
            phone=null
        }
        try {
            const r= await Users.update({name,sername,nickname,date,phone},{where: {id}})
            if(r){
                if(req.files){
                    const {avatar}=req.files
                    if(checkFile(avatar)){
                        const title=uuid.v4()+'.jpg'
                        avatar.mv(path.resolve(__dirname,'..','static', title))
                        const f= await Users.update({avatar:title},{where: {id}})
                        res.json({
                            token:jwt.sign(
                                {
                                    id,
                                    name,
                                    sername,
                                    nickname,
                                    date,
                                    phone,
                                    avatar:title
                                },
                                process.env.SECRET_KEY,
                                {expiresIn:'24h'}),
                                message:'Сохранено'
                            })
                    }
                    else{
                        res.status(404).json('Неправильный формат')
                    }
                }
                else{
                    res.json({
                        token: jwt.sign({
                            id,
                            name,
                            sername,
                            nickname,
                            date,
                            phone,
                            avatar:oldavatar
                        },
                            process.env.SECRET_KEY,
                            {expiresIn:'24h'}),
                            message:'Сохранено'
                        })
                }
            }
    
        } catch (error) {
            if(error.name=='SequelizeUniqueConstraintError'){
                res.status(402).json('Пользователь с таким псевдонимом уже существует')
            }
            else{
                res.status(404).json(error)
            }
            
        } 
    }
    
     
}
async function getUser(req,res){
    const {id}=req.body
    const r=await Users.findOne({where:{id},attributes:['name','sername','nickname','date','phone']})
    res.json(r)
}
module.exports={setInfo,getUser}