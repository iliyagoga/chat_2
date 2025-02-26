import store from "../../store/store"


export function clear(){
    const socket=store.getSocket()
    store.setMessages([])
    store.setFiles([])
    socket.removeAllListeners('@sendServerChat')
    socket.disconnect()
  
    store.setSocket(null)
}