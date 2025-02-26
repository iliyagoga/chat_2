const Router=require('express')
const {setInfo, getUser} =require('../controllers/profileController')
const routes = require('../routes')
const tokenValid=require('../middlewares/tokenValid')
const router= new Router()
router.post(routes.profile.setInfo,setInfo)
router.get(routes.profile.getInfo,getUser)
module.exports=router