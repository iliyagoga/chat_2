const { Users } = require("../models/model");
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
async function login(req,res){
    const Check=await Users.findOne({where:{nickname:req.body.nickname}})
    if(Check!=null){
        const {password}=req.body
        const h=await bcrypt.compare(password,Check.password)
        if(h){
            res.json(jwt.sign({Check},process.env.SECRET_KEY,{expiresIn:'24h'}))
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
    const Check=await Users.findOne({where:{nickname:req.body.nickname}})
    if(Check==null){
        const {nickname,password}=req.body
        const hash = await bcrypt.hash(password,10)
        const result= await Users.create({nickname : nickname, password: hash})
        res.json(jwt.sign({result},process.env.SECRET_KEY,{expiresIn:'24h'}))
    }
    else{
        res.status(404).json('Такой пользователь существует')
    }
    
}
async function check(req,res){
    const {token}=req.body
    const c=jwt.verify(token,process.env.SECRET_KEY)
    res.json(c)

}

module.exports={login,reg,check}