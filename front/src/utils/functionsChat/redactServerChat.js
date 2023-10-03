import store from "../../store/store"
import storeChat from "../../store/storeChat"

export function redactServerChat(input){
    const socket=store.getSocket()
    
    socket.on('@redactServerChat',(result)=>{
        const ind=result.index
        if(result.a==1){
            if((store.getIndex()?store.getIndex():ind)!=null){
                if((store.getIndex()?store.getIndex():ind)==store.getMessages().length){
                    const copy=Object.assign(store.getMessages())
                        copy[copy.length-1].message=result.message
                        copy[copy.length-1].file=result.file
                        store.setMessages(copy)
                }
                else{
                    if((store.getIndex()?store.getIndex():ind)==0){
                        const copy=Object.assign(store.getMessages())
                        copy[0].message=result.message
                        copy[0].file=result.file
                        store.setMessages(copy)
                    }
                    else{
                        const copy=Object.assign(store.getMessages())
                        copy[store.getIndex()?store.getIndex():ind].message=result.message
                        copy[store.getIndex()?store.getIndex():ind].file=result.file
                        store.setMessages(copy)
                    }
               }
            
          }
            storeChat.setClc(false)
            storeChat.setMgid(null)
            storeChat.setRed(false)
            storeChat.setTextarea('')
            input.current.value=''
      }
     })
}