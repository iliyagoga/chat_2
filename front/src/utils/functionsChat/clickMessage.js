import store from "../../store/store";
import storeChat from "../../store/storeChat";

export async function clickMessage(){
    const socket=store.getSocket()
    if(storeChat.getClc() ){
        socket.emit('@deleteMessageChat',{msgid:storeChat.getMgid(),index:store.getIndex()})
    }
}