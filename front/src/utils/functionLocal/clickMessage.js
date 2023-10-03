import store from "../../store/store";
import storeLocal from "../../store/storeLocal";

export async function clickMessage(){
    const socket=store.getSocket()
    if(storeLocal.getClc() ){
        socket.emit('@deleteMessage',{msgid:storeLocal.getMgid(),room:store.getJoinRoom(),index:store.getIndex()})
    }
}