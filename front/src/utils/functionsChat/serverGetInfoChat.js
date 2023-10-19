import store from "../../store/store"

export function serverGetInfoChat(){
    const socket=store.getSocket()
    
    socket.on('@serverGetInfoChat',(req)=>{
        if(req.message.name!="SequelizeDatabaseError"&&req.message.name!='SequelizeUniqueConstraintError')
            store.setChatInfo(req.message)
        else{
            if(req.message.name!="SequelizeDatabaseError"){
                store.setChatInfo({...store.getChatInfo(),error:req.message.name})
            }
        }
          
    })
}