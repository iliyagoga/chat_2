import store from "../../store/store"


export function clear(){
    const socket=store.getSocket()
    store.setMessages([])
    store.setFiles([])
    socket.disconnect()
    socket.removeAllListeners('@sendServerChat')
    store.setSocket(null)
}