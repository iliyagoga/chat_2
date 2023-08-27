const Router=require('express')
const routes=require('../routes')
const validation=require('../middlewares/validation')
const { reg,login, check} = require('../controllers/loginController')
const router=new Router()
router.post(routes.login.login, login)
router.post(routes.login.reg,validation, reg)
router.post(routes.login.check,check)
module.exports=router