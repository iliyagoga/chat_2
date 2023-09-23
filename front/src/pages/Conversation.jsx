import HeaderCon from "../componets/HeaderCon";
import send from '../assets/send.png'
import file from '../assets/file.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import jwtDecode from "jwt-decode";
import del from '../assets/delete.png'
import pencil from '../assets/pencil.png'
import axios from "axios";
import { config } from "../utils/config";
import { useEffect, useRef, useState } from "react";
import randomstring from 'randomstring'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../utils/routes";
import { axiosOb } from "../utils/functions";
const Conversation =observer(()=>{
    const socket=store.getSocket()
    const nav=useNavigate()
    if(socket){
    const input=useRef()
    const [index,setIndex]=useState(null)
    const [mgid,setMgid]=useState(null)
    const[clc,setClc]=useState(false)
    const [textarea,setTextarea]=useState('')
    const idroom=randomstring.generate()
    const idroom2=store.getJoinRoom()?store.getJoinRoom():randomstring.generate()
    const myid=jwtDecode(store.getToken()).id
    const mynickname=jwtDecode(store.getToken()).nickname
    const myavatar=jwtDecode(store.getToken()).avatar
    const [action,setAction]=useState(false)
    const[red,setRed]=useState(false)
    const [text,setText]=useState(null)
    const [fileValue,setFileValue]=useState(null)
    async function get(room){
        try {
            const r= await axiosOb(
                config.backHost+config.check,
                {
                    nick1: store.getAPerson(),
                    nick2: jwtDecode(localStorage.getItem('token')).nickname,
                    id1: store.getAId(),
                    id2:jwtDecode(localStorage.getItem('token')).id,
                    mode:'locale',
                room})
                return r.data
        } catch (error) {
            
        }
    }

    const getter=(roomid)=>{
        socket.on('@sendServer',(req)=>{
            store.setMessages([...store.getMessages(),{message:req.message,id:req.id,msgid:req.msgid,file: req.file}])

        })
    }
    const setter=()=>{
        if(!red){
            if(fileValue){
                socket.emit('@sendClient',{message: textarea,id:myid,recipient: store.getAId(),files:fileValue,type: fileValue.name.split('.'),size:fileValue.size})
            }
            else{
                socket.emit('@sendClient',{message: textarea,id:myid,recipient: store.getAId()})
            }
            
            setTextarea('')
            setFileValue(null)
            input.current.value=''
        }
        else{
            if(fileValue){
                socket.emit('@redactMessage',{message: textarea,index:store.getIndex(),id:mgid,files:fileValue,type: fileValue.name.split('.'),size:fileValue.size})
            }
            else{
                socket.emit('@redactMessage',{message: textarea,index:store.getIndex(),id:mgid})
            }

        }
       
    }
    useEffect(()=>{
        let roomid
        get(idroom2).then(r=>{
            store.setJoinRoom(r.LocalId)
            roomid=r.LocalId
            axiosOb(config.backHost+routes.chat+routes.getLocalMessage,{LocalId: roomid}).then(r=>{
                    store.setMessages([])
                    r.data.map(v=>{store.setMessages([...store.getMessages(),{message:v.message,id:v.Sender.sender,msgid: v.id,file: v.Files[0]?v.Files[0].file:null}])})
            })
            socket.emit('@joinRoom',{message:{room:roomid,personId:store.getAId(),chatId:idroom,nickname:mynickname,myavatar:myavatar,myid:myid}})
            getter(roomid)
        })
        socket.on('@deleteMServer',(result)=>{
            const ind=result.index
            if(result.a==1){
                if((store.getIndex()?store.getIndex():ind)!=null){
                    if((store.getIndex()?store.getIndex():ind)==store.getMessages().length){
                        store.setMessages([...store.getMessages().slice(0,(store.getIndex()?store.getIndex():ind))])
                    }
                    else{
                        if((store.getIndex()?store.getIndex():ind)==0){
                            
                            store.setMessages([...store.getMessages().slice(1)])
                        }
                        else{
                            store.setMessages([...store.getMessages().slice(0,(store.getIndex()?store.getIndex():ind)),...store.getMessages().slice((store.getIndex()?store.getIndex():ind)+1)])
                        }
                    }
                    
                }
                setClc(false)
                setIndex(null)
                setMgid(null)
                
            }
        })
        socket.on('@redactMServer',(result)=>{
            const ind=result.index
            if(result.a==1){
                if((store.getIndex()?store.getIndex():ind)!=null){
                    if((store.getIndex()?store.getIndex():ind)==store.getMessages().length){
                        const copy=Object.assign(store.getMessages())
                            copy[copy.length-1].message=result.message
                            copy[copy.length-1].mfile=result.file
                            store.setMessages(copy)
                    }
                    else{
                        if((store.getIndex()?store.getIndex():ind)==0){
                            const copy=Object.assign(store.getMessages())
                            copy[0].message=result.message
                            copy[0].file=result.file
                            store.setMessages(copy)
                        }
                        else{
                            const copy=Object.assign(store.getMessages())
                            copy[store.getIndex()?store.getIndex():ind].message=result.message
                            copy[store.getIndex()?store.getIndex():ind].file=result.file
                            store.setMessages(copy)
                        }
                    }
                    
                }
                setClc(false)
                setIndex(null)
                setMgid(null)
                setRed(false)
                setTextarea('')
                input.current.value=''
                
            }
        })
        

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
    async function clickMessage(){
        if(clc ){
            socket.emit('@deleteMessage',{msgid:mgid,room:store.getJoinRoom(),index:store.getIndex()})
        }
    }
    async function redact(){
        if(clc){
            setRed(true)
            setTextarea(text)
        }
    }
    
    return <div className="container_con">
        {!clc?<HeaderCon></HeaderCon>:  
        <div className="header_con two">
            <img src={pencil}  onClick={()=>{redact()}}/>
            <img src={del} onClick={()=>{clickMessage()}} alt="" />
        </div>}
        <p className="status">{action&&'Печатает..'}.</p>
        <div className="body">
            <div className="b">
                {store.getMessages().map((v,i)=>{
                    if(v.id!=myid)
                    return <div className="right" >{
                        <>{v.message}
                        <br></br> 
                        <a target="_blank" href={config.backHost+'/'+v.file}>
                            {v.file}
                        </a></>}</div>
                    return <div className="left" onClick={()=>{
                        setClc(!clc);
                        store.setIndex(i);
                        setText(v.message);
                        setMgid(v.msgid)}}>{
                            <>{v.message}
                            <br></br> 
                            <a target="_blank" href={config.backHost+'/'+v.file}>
                                {v.file}
                            </a></>}
                        </div>

                    })}
            </div>
        </div>
        <div className='intext'>
            <div className="file">
                {(fileValue)&&<div className="dele" title="удалить файл" onClick={()=>{
                    input.current.value=''
                    setFileValue(null)
                }}>
                    <img src={del} alt="" />
                </div>}
                <p>{fileValue&&fileValue.name}</p>
                <div style={{position:'relative'}} onKeyDown={(e)=>{if(e.key=='Enter'){
                setter()
            }}}>
                    <img src={file} alt="" />
                    <input ref={input}onChange={(e)=>{setFileValue(e.target.files[0])}} type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0',cursor:'pointer'}}/>
                </div>
            </div>
                
            <textarea value={textarea}onChange={(e)=>{setTextarea(e.target.value)}}
            onKeyDown={(e)=>{if(e.key=='Enter'){
                setter()
            }}}type="text" />
            <img src={send} onClick={setter} alt="" />
        </div>
    </div>
    }
    else{
        nav('/messages')
    }
})
export default Conversation

