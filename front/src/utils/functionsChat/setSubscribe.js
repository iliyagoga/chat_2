import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"

export  function setSubscribe(){
    const userid=jwtDecode(localStorage.getItem('token')).id
    const socket=store.getSocket()
    const chatid =store.getChatId()
    socket.emit('@clientSetSubscribe',{chatid,userid})
    socket.on('@serverSetSubscribe',(req)=>{
        store.setCheckSubscribe(true)

        storeChat.setReload(true)
    })
}