const loginRouter=require('./routes/loginRouter')
const routes=require('./routes')
const Router=require('express')
const router=new Router()
router.use(routes.login.way,loginRouter)
module.exports=router