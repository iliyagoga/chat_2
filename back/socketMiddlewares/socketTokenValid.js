const jwt =require('jsonwebtoken')
module.exports=function(socket,next){
    try {
        const token = socket.handshake.auth.token

        const id=socket.handshake.auth.id
        if(!token){
            next( new Error('Пользователь не авторизован'))
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(id==jwt.decode(token).id){
            next()
        }
        else{
            next( new Error(('Ошибка')))
        }
        
        
    } catch (error) {
        console.log(error)
        next( new Error(('Пользователь не авторизован')))
    }
}