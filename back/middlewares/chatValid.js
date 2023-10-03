const {Chats, Subscribers}=require('../models/model')

async function chatValid(req,res,next){
    const {chatid,userid}=req.body
    try {
        const r1=await Chats.findOne({where: {id:chatid,vision:false}})
            if(r1){
                const r2 =await Subscribers.findOne({where:{ChatId:chatid,subscriber:userid}})
                if(r2){
                    next()
                }
                else{
                    res.status(401).json('Невозможно получить информацию')
                }
            }
            else{
                next()
            }
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports={chatValid}