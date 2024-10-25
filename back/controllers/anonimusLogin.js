const { AnonimusUser } = require("../models/model");
async function reg(req,res){
    try {
        const sessionid=jwt.sign(def,process.env.SECRET_KEY,{expiresIn:'24h'})
        const Check= await AnonimusUser.create({sessionid})
        res.status(201).json(sessionid)
    } catch (error) {
        res.status(404)  
    }
    
}
async function check(req,res){
    const {sessionid}=req.body
    try {
        const c=jwt.verify(sessionid,process.env.SECRET_KEY)
        res.status(201).json(sessionid)
    } catch (error) {
        res.status(404).json(null)
    }
    
    

}