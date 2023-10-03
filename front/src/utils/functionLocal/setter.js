import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeLocal from "../../store/storeLocal"

export  const setter=(input,b)=>{
    const socket=store.getSocket()
    const myid=jwtDecode(store.getToken()).id
    const resip=Number(store.getAId()?store.getAId():localStorage.getItem('Aid'))
    if(!storeLocal.getRed()){
        if(storeLocal.getFileValue()){
            socket.emit('@sendClient',{message: storeLocal.getTextarea(),id:myid,recipient: resip,files:storeLocal.getFileValue(),type: storeLocal.getFileValue().name.split('.'),size:storeLocal.getFileValue().size})
        }
        else{
            socket.emit('@sendClient',{message: storeLocal.getTextarea(),id:myid,recipient: resip})

        }
        
        storeLocal.setTextarea('')
        storeLocal.setFileValue(null)
        input.current.value=''
        b.current.scrollTo(0,b.current.scrollHeight+100)
    }
    else{
        if(storeLocal.getFileValue()){
            socket.emit('@redactMessage',{message: storeLocal.getTextarea(),index:store.getIndex(),id:storeLocal.getMgid(),files:storeLocal.getFileValue(),type: storeLocal.getFileValue().name.split('.'),size:storeLocal.getFileValue().size})
        }
        else{
            socket.emit('@redactMessage',{message: storeLocal.getTextarea(),index:store.getIndex(),id:storeLocal.getMgid()})
        }

    }
   
}