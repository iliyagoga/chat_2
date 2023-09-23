import send from '../assets/send.png'
import file from '../assets/file.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import jwtDecode from "jwt-decode";
import del from '../assets/delete.png'
import pencil from '../assets/pencil.png'
import { config } from "../utils/config";
import { useEffect, useRef, useState } from "react";
import { routes } from "../utils/routes";
import HeaderChat from "../componets/HeaderChat";
import { axiosOb } from '../utils/functions';
const ChatConversation =observer(()=>{
    const [clc,setClc]=useState(false)
    const [textarea,setTextarea]=useState('')
    const input=useRef()
    const [text,setText]=useState(null)
    const [fileValue,setFileValue]=useState(null)
    const socket =store.getSocket()
    const chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
    async function getChatMessages(){
        try {
           const res=await axiosOb(config.backHost+routes.chat+routes.getChatMessages,{userid,chatid})
           console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getChatMessages()
        socket.emit("@joinChat",{chatid,userid})
        socket.on('@joinChatOk',()=>{
        socket.emit('@clientGetInfoChat',{chatid})
        socket.on('@serverGetInfoChat',(req)=>{
            store.setChatInfo(req.message)
        })
        
        
    })
    },[])
    
    return <div className="container_con">
        {!clc?<HeaderChat/>:  
        <div className="header_con two">
            <img src={pencil}  />
            <img src={del}  />
        </div>}
        <p className="status">{'Печатает..'}.</p>
        <div className="body">
            <div className="b">
                
            </div>
        </div>
    {store.getChatInfo()&&!store.getChatInfo().moot&&<div className='intext'>
            <div className="file">
                {(fileValue)&&<div className="dele" title="удалить файл" onClick={()=>{
                    input.current.value=''
                    setFileValue(null)
                }}>
                    <img src={del} alt="" />
                </div>}
                <p>{fileValue&&fileValue.name}</p>
                <div style={{position:'relative'}} onKeyDown={(e)=>{if(e.key=='Enter'){

            }}}>
                    <img src={file} alt="" />
                    <input ref={input}onChange={(e)=>{setFileValue(e.target.files[0])}} type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0',cursor:'pointer'}}/>
                </div>
            </div>
                
            <textarea value={textarea}onChange={(e)=>{setTextarea(e.target.value)}}
            onKeyDown={(e)=>{if(e.key=='Enter'){

            }}}type="text" />
            <img src={send}  alt="" />
        </div>}
     
    </div>
    
    
})
export default ChatConversation

