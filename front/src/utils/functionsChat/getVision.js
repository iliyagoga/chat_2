import jwtDecode from "jwt-decode";
import store from "../../store/store";
import storeChat from "../../store/storeChat";
import { delet } from "./delet";
import { clear } from "./clear";

export function getVision(nav){
    const socket=store.getSocket()
    const userid =jwtDecode(localStorage.getItem('token')).id
    socket.on('@getVision',(r=>{
        let u=Object.assign(store.getChatInfo())
        u.vision=r.vision
        store.setChatInfo(u)
        if(!store.getCheckSubscribe()){
            storeChat.setReload(r.vision)
            delet()
            if(!r.vision){
                socket.removeAllListeners('@sendServerChat')
            }
            
            
        }
        
    }))
}