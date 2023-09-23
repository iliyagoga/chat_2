import axios from 'axios'
import HeaderML from '../componets/HeaderML'
import MessagesStroke from '../componets/MessageStroke'
import {observer} from 'mobx-react-lite'
import { config } from '../utils/config'
import store from '../store/store'
import { useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import { routes } from '../utils/routes'
const MessagesList =observer(()=>{
    const [chats,setChats]=useState([])
    async function get(){
        const r= await axios.post(config.backHost+config.getChats,{userid: jwt(store.getToken()).id},
            {headers:{
                Authorization: 'Bearer '+store.getToken(), 
                "Content-Type": "multipart/form-data"}
            })
        setChats(r.data)
    }
    useEffect(()=>{
        //get()
        const socket=io('http://localhost:5000')
        socket.connect()
        socket.emit('connection')
        socket.emit('@connect',{message:jwtDecode(store.getToken()).id})
        store.setSocket(socket)
        console.log('Подключен')
        socket.emit('@createMLRoom',{message:jwtDecode(store.getToken()).id})
        axios.post(config.backHost+routes.chat+routes.getLastMessageLocal,{sender:jwtDecode(store.getToken()).id},{headers:{
            Authorization: 'Bearer '+store.getToken(), 
            "Content-Type": "multipart/form-data"}
        }).then(r=>{
            r.data.map((v)=>setChats((chats)=>[...chats,v]))})
        socket.on('@sendServer2',(r)=>{
            setChats((chats)=>[...(chats.map((v)=>{if(v.room!=r.room) return v}).filter(function( element ) {
                return element !== undefined;
             }))])
            setChats((chats)=>[...chats,r])
            
        })

       
    },[])
    return <div className="container_c">
        <HeaderML></HeaderML>
        <div className='body_c'>
           {chats.length==0?[]:chats.map((v)=>{console.log(v);return <MessagesStroke key={v.chatId}v={v}/>})}
        </div>
    </div>
})
export default MessagesList