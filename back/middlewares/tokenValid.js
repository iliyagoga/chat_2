const jwt =require('jsonwebtoken')
module.exports=function(req,res,next){
    if(req.mothod=== "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        const id=req.headers.id
        if(!token){
            return res.status(401).json('Пользователь не авторизован')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(id==jwt.decode(token).id){
            req.user =decoded
            next()
        }
        else{
            return res.status(401).json('Ошибка')
        }
        
        
    } catch (error) {
        return res.status(401).json('Пользователь не авторизован')
    }
}