const Router=require('express')
const routes=require('../routes')
const validation=require('../middlewares/validation')
const { reg,login} = require('../controllers/loginController')
const router=new Router()
router.post(routes.login.login,validation, login)
router.post(routes.login.reg,validation,reg)
module.exports=router