import store from "../../store/store"
import storeChat from "../../store/storeChat"

export function sendServerChat(req){
    if(req.file!=undefined)
        store.setFiles([...store.getFiles(),req.file.length>0?req.file:null])
    store.setMessages([...store.getMessages(),{
    message:req.message,
    id:req.userId,
    file: req.file,
    avatar:req.myinfo.avatar,
    name: req.myinfo.name,
    sername:req.myinfo.sername,
    nick:req.myinfo.nickname,
    msgid:req.msgid
    }])
    storeChat.setEmitMessage(true)
}