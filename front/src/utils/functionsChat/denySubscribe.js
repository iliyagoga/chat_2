import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"

export  function denySubscribe(){
    const userid=jwtDecode(localStorage.getItem('token')).id
    const socket=store.getSocket()
    const chatid =store.getChatId()
    socket.emit('@clientDenySubscribe',{chatid,userid})
    socket.on('@serverDenySubscribe',(req)=>{
        store.setCheckSubscribe(false)

        storeChat.setReload(true)
    })
}