const { Users } = require("../models/model")
const jwt=require('jsonwebtoken')
async function setInfo(req,res){
    const {id,name,sername,nickname,date,phone,avatar}=req.body
    console.log(req.files)
    try {
        const r= await Users.update({name,sername,nickname,date,phone},{where: {id}})
        if(r){
            res.json(jwt.sign({id,name,sername,nickname,date,phone},process.env.SECRET_KEY,{expiresIn:'24h'}))
        }

    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }   
}
async function getUser(req,res){
    const {id}=req.body
    const r=await Users.findOne({where:{id},attributes:['name','sername','nickname','date','phone']})
    res.json(r)
}
module.exports={setInfo,getUser}