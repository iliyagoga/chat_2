import store from "../../../store/store"
import storeLocal from "../../../store/storeLocal"

export function sendServer(req){
        store.setMessages([...store.getMessages(),{message:req.message,id:req.id,msgid:req.msgid,file: req.file}])
        storeLocal.setEmitMessage(true)
}