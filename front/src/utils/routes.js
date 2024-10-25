import { config } from "./config";

export const routes={
backHost:config.backHost,
messages: '/messages',
conversationLocal: '/conversation/local/:id',
conversationChat: '/conversation/chat/:id',
conversationLocal2: '/conversation/local/',
conversationChat2: '/conversation/chat/',
login: '/login',
login2: 'login',
check:'/check',
reg:'/registration',
profile: '/profile',
chat: 'chat',
createMessageLocal: '/createLocalMessage',
getLocalMessage: '/getLocalMessage',
createRecipientMessageLocal:'/createRecipientMessageLocal',
getLastMessageLocal:'/getLastMessageLocal',
deleteMesage: '/deleteMessage',
createChat:'/createChat',
checkSubscribe:'/checkSubscribe',
getChatMessages:'/getChatMessages',
getAllMembers:'/getAllMembers',
setVision:'/setVision',
getPersonInfo:'/getPersonInfo'

}