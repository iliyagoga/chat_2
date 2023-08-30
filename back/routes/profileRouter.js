const Router=require('express')
const {setInfo, getUser} =require('../controllers/profileController')
const routes = require('../routes')
const tokenValid=require('../middlewares/tokenValid')
const router= new Router()
router.post(routes.profile.setInfo,tokenValid,setInfo)
router.get(routes.profile.getInfo,tokenValid,getUser)
module.exports=router