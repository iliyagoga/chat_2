const { Users } = require("../models/model");
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
async function login(req,res){
    const Check=await Users.findOne({where:{nickname:req.body.nickname}})
    if(Check!=null){
        const def={
            id:Check.dataValues.id,
            nickname: Check.dataValues.nickname,
            name: Check.dataValues.name,
            sername: Check.dataValues.sername,
            phone:Check.dataValues.phone,
            avatar:Check.dataValues.avatar,
            date: Check.dataValues.date,
            regdate:Check.dataValues.regdate
        }
        const {password}=req.body
        const h=await bcrypt.compare(password,Check.password)
        if(h){
            res.json(jwt.sign(def,process.env.SECRET_KEY,{expiresIn:'24h'}))
        }
        else{
            res.status(404).json('Неправильный логин или пароль')
        }
        
    }
    else{
        res.status(404).json('Такого пользователя не существует, пожалуйста зарегистрируетесь')
    }
}
async function reg(req,res){
    const c=await Users.findOne({where:{nickname:req.body.nickname}})
    if(c==null){
        const {nickname,password}=req.body
        const hash = await bcrypt.hash(password,10)
        const Check= await Users.create({nickname : nickname, password: hash})
        const def={
            id:Check.dataValues.id,
            nickname: Check.dataValues.nickname,
            name: Check.dataValues.name,
            sername: Check.dataValues.sername,
            phone:Check.dataValues.phone,
            avatar:Check.dataValues.avatar,
            date: Check.dataValues.date,
            regdate:Check.dataValues.regdate
        }
        res.json(jwt.sign(def,process.env.SECRET_KEY,{expiresIn:'24h'}))
    }
    else{
        res.status(404).json('Такой пользователь не существует')
    }
    
}
async function check(req,res){
    const {token}=req.body
    try {
        const c=jwt.verify(token,process.env.SECRET_KEY)
        res.json(true)
    } catch (error) {
        res.json(false)
    }
    
    

}

module.exports={login,reg,check}