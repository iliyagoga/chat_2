import HeaderML from '../componets/HeaderML'
import MessagesStroke from '../componets/MessageStroke'
import {observer} from 'mobx-react-lite'
import { config } from '../utils/config'
import store from '../store/store'
import { useEffect, useState } from 'react'
import jwtDecode from "jwt-decode";
import { routes } from '../utils/routes'
import { axiosOb, inicialSocket } from '../utils/functions'
import Alert from '../componets/alert'
import { api } from '../utils/API'
const MessagesList =observer(()=>{
    const [chats,setChats]=useState([])
    const [err,setErr]=useState(false)
    useEffect(()=>{
        let socket
        if(!store.getSocket()){
            socket=inicialSocket()
            socket.emit('@createMLRoom',{message:jwtDecode(store.getToken()).id})
        }
        else{
            socket=store.getSocket()
        }

        axiosOb(api.backHost+api.chat.way+api.chat.getLastMessageLocal,{sender:jwtDecode(localStorage.getItem('token')).id}).then(r=>{
            r.data.map((v)=>{
                if(v)
                setChats((chats)=>[...chats,v])
            })}).catch(err=>{
                if(err.code=='ERR_NETWORK'){
                    setErr(true)

                }
            })

        socket.on('@sendServer2',(r)=>{
            setChats((chats)=>[...(chats.map((v)=>{if(v.room!=r.room) return v}).filter(function( element ) {
                return element !== undefined;
             }))])
            setChats((chats)=>[...chats,r])
            
        })

       
    },[])
    return <div className="container_c">
        <HeaderML></HeaderML>
        {err && <p style={{marginLeft:'1rem',fontFamily:'sans-serif'}}>Сервер не отвечает, подождите некоторое время</p>}
        <div className='body_c'>
           {chats.length==0?[]:chats.map((v,i)=>{return <MessagesStroke key={i} v={v}/>})}
        </div>
    </div>
})
export default MessagesList