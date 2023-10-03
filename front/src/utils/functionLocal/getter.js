import store from "../../store/store"
import { sendServer } from "./underFunctions/sendServer"

export  const getter=()=>{
    const socket=store.getSocket()
    socket.on('@sendServer',sendServer)
}