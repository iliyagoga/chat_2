import store from "../../store/store"
import { sendServer } from "./underFunctions/sendServer"

export function clear(){
    const socket=store.getSocket()
    socket.disconnect()
    socket.removeAllListeners('@joinRoom')
    socket.removeAllListeners('@sendServer')
    store.setSocket(null)
    store.setMessages([])

}