const loginRouter=require('./routes/loginRouter')
const profileRouter=require('./routes/profileRouter')
const routes=require('./routes')
const Router=require('express')
const router=new Router()
router.use(routes.login.way,loginRouter)
router.use(routes.profile.way,profileRouter)
module.exports=router