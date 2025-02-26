import store from "../../store/store"

export function setWriteChatServer(){
    const socket=store.getSocket()
    
    socket.on('@setWriteChatServer',(r)=>{
        const write=store.getWriteActive()
        const arr=[...new Set([...write,r.request.name])]
        if(write.length>2){
            store.setWriteActive([...arr.slice(1)]) 
        }
        else{
            store.setWriteActive([...arr]) 
        }
    })
}