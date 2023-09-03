const Router =require('express')
const routes = require('../routes')
const {  getChats, checkOrCreateLocal } = require('../controllers/chatController')
const router=new Router()
router.post(routes.chat.check,checkOrCreateLocal)
router.post(routes.chat.getChats,getChats)
module.exports=router