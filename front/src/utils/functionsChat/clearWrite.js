import jwtDecode from "jwt-decode"
import store from "../../store/store"

export async function checkWrite(e){
    const myinfo=jwtDecode(store.getToken())
    const socket=store.getSocket()
    if(e.length>0){
        socket.emit('@setWriteChatClient',{name:myinfo.nickname})
    }
    else{
        socket.emit('@denyWriteChatClient',{name:myinfo.nickname})
    }

}