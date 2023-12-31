const Router =require('express')
const routes = require('../routes')
const {  getChats, checkOrCreateLocal, getMessageLocal,getLocalsChats, createChat, checkSubscribe,getChatMessages,getAllMembers, getPerson} = require('../controllers/chatController')
const {chatValid} =require('../middlewares/chatValid')
const router=new Router()
router.post(routes.chat.check,checkOrCreateLocal)
router.post(routes.chat.getChats,getChats)
router.post(routes.chat.getLocalMessage,getMessageLocal)
router.post(routes.chat.getLastMessageLocal,getLocalsChats)
router.post(routes.chat.getPersonInfo,getPerson)

router.post(routes.chat.createChat,createChat)
router.post(routes.chat.checkSubscribe,checkSubscribe)
router.post(routes.chat.getChatMessages,chatValid,getChatMessages)
router.post(routes.chat.getAllMembers,chatValid,getAllMembers)

module.exports=router