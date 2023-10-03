import store from "../../store/store"
import storeLocal from "../../store/storeLocal"

export function redactMServer(input){
    const socket=store.getSocket()
    socket.on('@redactMServer',(result)=>{
        const ind=result.index
        if(result.a==1){
            if((store.getIndex()?store.getIndex():ind)!=null){
                if((store.getIndex()?store.getIndex():ind)==store.getMessages().length){
                    const copy=Object.assign(store.getMessages())
                        copy[copy.length-1].message=result.message
                        copy[copy.length-1].mfile=result.file
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
            storeLocal.setClc(false)
            store.setIndex(null)
            storeLocal.setMgid(null)
            storeLocal.setRed(false)
            storeLocal.setTextarea('')
            input.current.value=''
            
        }
    })
}