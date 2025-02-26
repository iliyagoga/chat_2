import store from "../../store/store"

export function denyWriteChatServer(){
    const socket=store.getSocket()
    
    socket.on('@denyWriteChatServer',(r)=>{
        const write=store.getWriteActive()
        let arr=[]
        for(let i=0;i<write.length;i++){
            if(write[i]!=r.request.name){
                arr.push(write[i])
            }
        
        }
        store.setWriteActive(arr)
    })
}