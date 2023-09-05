import HeaderCon from "../componets/HeaderCon";
import send from '../assets/send.png'
import file from '../assets/file.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { config } from "../utils/config";
import { useEffect, useState } from "react";
import randomstring from 'randomstring'
import { useParams } from "react-router-dom";
import { routes } from "../utils/routes";
const Conversation =observer(()=>{
    const socket=store.getSocket()
    const params=useParams()
    const [textarea,setTextarea]=useState('')
    const [messages,setMessages]=useState([])
    const idroom=randomstring.generate()
    const idroom2=store.getJoinRoom()?store.getJoinRoom():randomstring.generate()
    const myid=jwtDecode(store.getToken()).id
    const mynickname=jwtDecode(store.getToken()).nickname
    const myavatar=jwtDecode(store.getToken()).avatar
    const [action,setAction]=useState(false)
    async function get(room){
        try {
            const r= await axios.post(
                config.backHost+config.check,
                {
                    nick1: store.getAPerson(),
                    nick2: jwtDecode(localStorage.getItem('token')).nickname,
                    id1: store.getAId(),
                    id2:jwtDecode(localStorage.getItem('token')).id,
                    mode:'locale',
                room},
                {headers:{
                    Authorization: 'Bearer '+store.getToken(), 
                    "Content-Type": "multipart/form-data"}
                })
                return r.data
        } catch (error) {
            
        }
    }

    const getter=(roomid)=>{
        socket.on('@sendServer',(req)=>{
            setMessages(messages=>[...messages,{message:req.message,id:req.id}])
            axios.post(config.backHost+routes.chat+routes.createMessageLocal,{message:req.message,LocalId: req.LocalId,sender:req.id,recipient: store.getAId()},{headers:{
                Authorization: 'Bearer '+store.getToken(), 
                "Content-Type": "multipart/form-data"}
            })
        })
    }
    const setter=()=>{
        socket.emit('@sendClient',{message: textarea,id:myid})
        
        setTextarea('')
    }
    useEffect(()=>{
        let roomid
        get(idroom2).then(r=>{
            roomid=r.LocalId
            axios.post(config.backHost+routes.chat+routes.getLocalMessage,{LocalId: roomid},{headers:{
                Authorization: 'Bearer '+store.getToken(), 
                "Content-Type": "multipart/form-data"}
            }).then(r=>{
                r.data.map(v=>{setMessages(messages=>[...messages,{message:v.message,id:v.Sender.sender}])})
            })
            socket.emit('@joinRoom',{message:{room:roomid,personId:store.getAId(),chatId:idroom,nickname:mynickname,myavatar:myavatar}})
            getter(roomid)
        })
        
        

    },[])
  
    useEffect(()=>{
        // socket.on('@setAction',(r)=>{
        //     if(r.id!=myid)
        //     setAction(true)
        // })
        // socket.on('@deleteAction',(r)=>{
        //     if(r.id!=myid)
        //     setAction(false)
        // })
        // if(textarea.length>0){
        //     socket.emit('@onaction',{id:myid})
        // }
        // if(textarea.length==0){
        //     socket.emit('@offaction',{id:myid})
        // }
    },[textarea])
    return <div className="container_con">
        <HeaderCon check={false}></HeaderCon>
        <p className="status">{action&&'Печатает..'}.</p>
        <div className="body">
            <div className="b">
                {messages.map((v,i)=>{
                    if(v.id!=myid)
                    return <div className="right">{v.message}</div>
                    return <div className="left">{v.message}</div>

                    })}
            </div>
        </div>
        <div className='intext'>
            <img src={file} alt="" />
            <textarea value={textarea}onChange={(e)=>{
        
                setTextarea(e.target.value)
            }}type="text" />
            <img src={send} onClick={setter} alt="" />
        </div>
    </div>
})
export default Conversation

