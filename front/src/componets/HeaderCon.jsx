import AutorInfoBlock from "./AutInfoBlock"
import store from "../store/store"
import { useState } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"
export default function HeaderCon(){
    const [status,Setstatus]=useState(false)
    const nav=useNavigate()
    const myid=jwtDecode(store.getToken()).id
    const socket=store.getSocket()
    socket.on('@status',(r)=>{
        if(r.message!=undefined)
        if(myid!=r.message){
            Setstatus(true)
            disconnected()
            socket.emit('@statusSet',{r})
        }
        
    })
    socket.on('@statusSetServer',(r)=>{
        Setstatus(true)
            disconnected()
    
    })
    
    function disconnected(){
        socket.on('@disconnected-server',(r)=>{
            if(r.req.message==Number(store.getAId())){
                Setstatus(false)
            }
                
        })
    }
    
    const var1=<div className="header_con">
        <p className="mess" onClick={()=>{nav('/messages')}}>cообщения</p>
        <AutorInfoBlock></AutorInfoBlock>
       {status&&<p>Онлайн</p>}
    </div>
    return <>{ var1}</>
}