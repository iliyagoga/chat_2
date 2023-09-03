const {Chats, Subscribers, Users,Local}=require('../models/model')
const {Op} =require('sequelize')
const uuid=require('uuid')
async function checkOrCreateLocal(req,res){
    const {id1,id2}=req.body
    const id=uuid.v4()
    if(id1 &&id2 &&id1!=undefined && id2!=undefined){
    try {
        const result=await Local.findOrCreate({
            defaults: {
                subscribers:id1+','+id2,
                id
            },
            where:{
                subscribers: [id1+','+id2,id2+','+id1]
                }})
        res.json(result)
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
module.exports={checkOrCreateLocal,getChats}