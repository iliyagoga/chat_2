import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"
import { deleteServerChat } from "./deleteServerChat"
import { denyWriteChatServer } from "./denyWriteChatServer"
import { getMoot } from "./getMoot"
import { getter } from "./getter"
import { redactServerChat } from "./redactServerChat"
import { serverGetInfoChat } from "./serverGetInfoChat"
import { setWriteChatServer } from "./setWriteChatServer"

export function joinChatOk(ewrrew,input){
    const socket=store.getSocket()
    let chatid=store.getChatId()
    const myid=jwtDecode(localStorage.getItem('token')).id

 
    
    socket.emit('@clientGetInfoChat',{chatid})

    socket.emit('@checkMoot',{id:myid,chatid})
    serverGetInfoChat()
      getMoot()
      redactServerChat(input)
    
      deleteServerChat()
  
      setWriteChatServer()
  
      denyWriteChatServer()
  
      deleteServerChat()
  

        getter()

        

      
    
       

   

}