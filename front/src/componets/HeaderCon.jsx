
import store from "../store/store"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import PersonModal from './modals/personModal'
import P_Block from "./P_Block"
import { getPersonInfo } from "../utils/functionLocal/getPersonInfo"
export default function HeaderCon(){
    const [status,Setstatus]=useState(false)
    const nav=useNavigate()
    const myid=jwtDecode(store.getToken()).id
    const [show,setShow]=useState(false)
    const socket=store.getSocket()
    if(socket){
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
    }
  
    function onHide(){
        setShow(false)
    }
    function disconnected(){
        socket.on('@disconnected-server',(r)=>{
            if(r.req.message==Number(store.getAId())){
                Setstatus(false)
            }
                
        })
    }
    useEffect(()=>{getPersonInfo()},[])
    const var1=<div className="header_con">
        {show&&<PersonModal onHide={onHide}></PersonModal>}
        <p className="mess" onClick={()=>{nav('/messages')}}>cообщения</p>
        <div onClick={()=>{setShow(true)}}>
            <P_Block></P_Block>
        </div>
       {status&&<p>Онлайн</p>}
    </div>
    return <>{ var1}</>
}