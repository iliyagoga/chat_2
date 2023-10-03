import store from "../../store/store"
import storeLocal from "../../store/storeLocal"

export function deleteMServer(){
    const socket=store.getSocket()
    socket.on('@deleteMServer',(result)=>{
        const ind=result.index
        if(result.a==1){
            if((store.getIndex()?store.getIndex():ind)!=null){
                if((store.getIndex()?store.getIndex():ind)==store.getMessages().length){
                    store.setMessages([...store.getMessages().slice(0,(store.getIndex()?store.getIndex():ind))])
                }
                else{
                    if((store.getIndex()?store.getIndex():ind)==0){
                        
                        store.setMessages([...store.getMessages().slice(1)])
                    }
                    else{
                        store.setMessages([...store.getMessages().slice(0,(store.getIndex()?store.getIndex():ind)),...store.getMessages().slice((store.getIndex()?store.getIndex():ind)+1)])
                    }
                }
                
            }
            storeLocal.setClc(false)
            store.setIndex(null)
            storeLocal.setMgid(null)
            
        }
    })
} 