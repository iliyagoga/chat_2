import store from "../../store/store";

export function setMoot(id,chatid){
    const socket=store.getSocket()
    socket.emit('@setMoot',{id,chatid})
}