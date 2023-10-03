import store from "../../store/store"

export function serverGetInfoChat(){
    const socket=store.getSocket()
    
    socket.on('@serverGetInfoChat',(req)=>{
        store.setChatInfo(req.message)
    })
}