import store from "../../store/store"
import storeChat from "../../store/storeChat"
import { deleteServerChat } from "./deleteServerChat"
import { denyWriteChatServer } from "./denyWriteChatServer"
import { getter } from "./getter"
import { redactServerChat } from "./redactServerChat"
import { serverGetInfoChat } from "./serverGetInfoChat"
import { setWriteChatServer } from "./setWriteChatServer"

export function joinChatOk(ewrrew,input){
    const socket=store.getSocket()
    let chatid=store.getChatId()

    getter()
    
    socket.emit('@clientGetInfoChat',{chatid})

    serverGetInfoChat()

    redactServerChat(input)

    deleteServerChat()

    setWriteChatServer()

    denyWriteChatServer()

    deleteServerChat()

}