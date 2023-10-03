import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeLocal from "../../store/storeLocal"

export function actions(){
    const socket=store.getSocket()
    const myid=jwtDecode(store.getToken()).id

    socket.on('@setAction',(r)=>{
        if(r.id!=myid)
        storeLocal.setAction(true)
    })
    socket.on('@deleteAction',(r)=>{
        if(r.id!=myid)
        storeLocal.setAction(false)
    })
    if(storeLocal.getTextarea().length>0){
        socket.emit('@onaction',{id:myid})
    }
    if(storeLocal.getTextarea().length==0){
        socket.emit('@offaction',{id:myid})
    }
}