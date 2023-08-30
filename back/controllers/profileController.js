const { Users } = require("../models/model")

async function sn(req,res){
    const {id,name}=req.body
    try {
        const r= await Users.update({name},{where: {id}})
        res.json(r)
    } catch (error) {
        res.status(404).json(error)
    }   
}
async function ss(req,res){
    const {id,sername}=req.body
    try {
        const r= await Users.update({sername},{where: {id}})
        res.json(r)
    } catch (error) {
        res.status(404).json(error)
    }   
}
async function sp(req,res){
    const {id,phone}=req.body
    try {
        const r= await Users.update({phone},{where: {id}})
        res.json(r)
    } catch (error) {
        res.status(404).json(error)
    }   
}
async function snick(req,res){
    const {id,nick}=req.body
    try {
        const r= await Users.update({nickname:nick},{where: {id}})
        res.json(r)
    } catch (error) {
        res.status(404).json(error)
    }   
}
async function sdate(req,res){
    const {id,date}=req.body
    try {
        const r= await Users.update({date},{where: {id}})
        res.json(r)
    } catch (error) {
        res.status(404).json(error)
    }   
}
async function getUser(req,res){
    const {id}=req.body
    const r=await Users.findOne({where:{id},attributes:['name','sername','nickname','date','phone']})
    res.json(r)
}
module.exports={sn,ss,sp,snick,sdate,getUser}