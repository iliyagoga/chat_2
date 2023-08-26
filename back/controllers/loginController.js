const { Users } = require("../models/model");

function login(req,res){



}
async function reg(req,res){
    const Check=await Users.findOne({where:{nickname:req.body.nickname}})
    res.json(JSON.stringify(Check))
}
module.exports={login,reg}