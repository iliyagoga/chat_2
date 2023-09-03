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
    async function get(){
        try {
            const r= await axios.post(
                config.backHost+config.check,
                {
                    nick1: store.getAPerson(),
                    nick2: jwtDecode(localStorage.getItem('token')).nickname,
                    id1: store.getAId(),
                    id2:jwtDecode(localStorage.getItem('token')).id,
                    mode:'locale'},
                {headers:{
                    Authorization: 'Bearer '+store.getToken(), 
                    "Content-Type": "multipart/form-data"}
                })
        } catch (error) {
            
        }
    }
    //get()
    const getter=()=>{
        socket.on('@sendServer',(req)=>{
            setMessages(messages=>[...messages,{message:req.message,id:req.id}])
        })
    }
    const setter=()=>{
        socket.emit('@sendClient',{message: textarea,id:myid})
        setTextarea('')
    }
    useEffect(()=>{
        socket.emit('@joinRoom',{message:{room:idroom2,personId:store.getAId(),chatId:idroom,nickname:mynickname,myavatar:myavatar}})
        getter()

    },[])
  
    useEffect(()=>{
        socket.on('@setAction',(r)=>{
            if(r.id!=myid)
            setAction(true)
        })
        socket.on('@deleteAction',(r)=>{
            if(r.id!=myid)
            setAction(false)
        })
        if(textarea.length>0){
            socket.emit('@onaction',{id:myid})
        }
        if(textarea.length==0){
            socket.emit('@offaction',{id:myid})
        }
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

