const { Users } = require("../models/model")
const {Op} =require('sequelize')
async function searchController(req,res){
    let{text}=(req.body)

    if(text.length>0){
        text=text.split('').join('.*')+'.*'
    try {
        const r=await Users.findAll({where:{
            nickname:{
                [Op.regexp]: ''+text+''
            }
            },attributes:['id','name','nickname','sername','avatar']
        })
        res.json(r)
    } catch (error) {
        res.status(404).json(error.name)
    }
}

}
module.exports={searchController}