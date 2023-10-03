import store from "../../store/store"
import { sendServerChat } from "./sendServerChat"

export const getter=()=>{
    const socket=store.getSocket()
    socket.on('@sendServerChat',sendServerChat)
}