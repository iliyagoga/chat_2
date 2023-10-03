import send from '../assets/send.png'
import file from '../assets/file.png'
import ava from '../assets/def_ava.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import jwtDecode from "jwt-decode";
import del from '../assets/delete.png'
import pencil from '../assets/pencil.png'
import { config } from "../utils/config";
import { useEffect, useRef, useState } from "react";
import HeaderChat from "../componets/HeaderChat";
import { inicialSocket, setSocket } from '../utils/functions';
import MemberModal from '../componets/modals/memberModal';
import MemberList from '../componets/modals/memberListModal';
import MembersModal from '../componets/modals/membersModal';
import FilesModal from '../componets/modals/fileModal';
import storeChat from '../store/storeChat';
import { clear } from '../utils/functionsChat/clear';
import { createColor } from '../utils/functionsChat/createColor';
import { getAllMembers } from '../utils/functionsChat/getAllMembers';
import { getChatMessages } from '../utils/functionsChat/getMessages';
import { clickMessage } from '../utils/functionsChat/clickMessage';
import { checkWrite } from '../utils/functionsChat/clearWrite';
import { redact } from '../utils/functionsChat/redact';
import { setter } from '../utils/functionsChat/setter';
import { memberModal } from '../utils/functionsChat/memberModal';
import { joinChatOk } from '../utils/functionsChat/joinChatOk';
const ChatConversation =observer(()=>{
    const input=useRef()
    const [write,setWrite]=useState(true)
    const b=useRef()
    let chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
   
    let socket =setSocket()
    if(!chatid){
        chatid=localStorage.getItem('chatid')
    }
   
    useEffect(()=>{
        storeChat.setB(b)
        store.setChatId(chatid)
        getAllMembers().then(r=>getChatMessages()).catch(error=>{
            if(error.response.data=='Невозможно получить информацию'){
                setWrite(false)
            }
        })
        socket.emit("@joinChat",{chatid,userid})
        socket.on('@joinChatOk',(req)=>{joinChatOk(req,input)})
        return ()=>{clear()}
    },[])


    useEffect(()=>{
        b.current.scrollTo(0,b.current.scrollHeight)
    },[storeChat.getLoaded()])

    useEffect(()=>{
        if(storeChat.getEmitMessage()){
            b.current.scrollTo(0,b.current.scrollHeight)
            storeChat.setEmitMessage(false)
        }

    },[storeChat.getEmitMessage()])
    

    return <div className="container_con">
        {storeChat.getMl() && <MemberList ></MemberList>}
        {storeChat.getMm() && <MemberModal></MemberModal>}
        {storeChat.getMs() && <MembersModal memberModal={memberModal}></MembersModal>}
        {storeChat.getMf() && <FilesModal ></FilesModal>}

        {!storeChat.getClc()?<HeaderChat/>:  
        <div className="header_con two">
            <img src={pencil} onClick={redact} />
            <img src={del} onClick={clickMessage} />
        </div>}
        {store.getWriteActive().length>0&&<p className="status">{'Печатает: '+store.getWriteActive().map(v=>{return v+' '})}</p>}
        <div className="body">
            <div className="b" ref={b}>
                {store.getMessages().map((v,i)=>{
                    if(v.id==userid){
                        return <div className='m_right' key={i} >
                                    <div className='message' onClick={()=>{
                                        storeChat.setClc(!storeChat.getClc());
                                        store.setIndex(i);
                                        storeChat.setMgid(v.msgid)
                                        storeChat.setText(v.message);
                                        }}>
                                        <h2 style={{color: createColor()}}>{v.sername?(v.name?v.name+' '+v.sername:v.nick):v.nick}</h2>
                                        <p>{v.message}</p>
                                        <br></br> 
                                        <a target="_blank" href={config.backHost+'/'+v.file}>
                                            {v.file}
                                        </a>
                                    </div>
                                    <div className='avatar' onClick={()=>{

                                        store.getMembers().map(e=>{
                                            if(e.id==v.id){
                                            memberModal({
                                                avatar:e.avatar,
                                                date:e.date,
                                                phone:e.phone,
                                                name:e.name,
                                                sername: e.sername,
                                                nickname:e.nickname
                                            })
                                        }})
                                        }}>
                                        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" />
                                    </div>
                                </div>
                    }
                    else{
                        return <div className='m_left' key={i}>
                                    <div className='avatar' onClick={()=>{
                                            store.getMembers().map(e=>{if(e.id==v.id){
                                                memberModal({
                                                    avatar:e.avatar,
                                                    date:e.date,
                                                    phone:e.phone,
                                                    name:e.name,
                                                    sername: e.sername,
                                                    nickname:e.nickname
                                                })
                                            }})
                                            }}>
                                        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" 
                                        />
                                    </div>
                                    <div className='message'>
                                        <h2 style={{color: createColor()}}>{v.sername?(v.name?v.name+' '+v.sername:v.nick):v.nick}</h2>
                                        <p>{v.message}</p>
                                        <br></br> 
                                        <a target="_blank" href={config.backHost+'/'+v.file}>
                                            {v.file}
                                        </a>
                                    </div>
                                </div> 
                    }
                })}
            </div>
        </div>


    {store.getChatInfo()&&!store.getChatInfo().moot&& write&&<div className='intext'>
            <div className="file">
                {(storeChat.getFileValue())&&<div className="dele" title="удалить файл" onClick={()=>{
                    input.current.value=''
                    storeChat.setFileValue(null)
                }}>
                    <img src={del} alt="" />
                </div>}
                <p>{storeChat.getFileValue()&&storeChat.getFileValue().name}</p>
                <div style={{position:'relative'}} onKeyDown={(e)=>{if(e.key=='Enter'){
            }}}>
                    <img src={file} alt="" />
                    <input 
                        ref={input}
                        onChange={(e)=>{storeChat.setFileValue(e.target.files[0])}} 
                        type="file" 
                        style={{
                            position:'absolute', 
                            width:'100%',
                            left: 0,
                            height:'100%',
                            opacity:'0',
                            cursor:'pointer'
                        }}/>
                </div>
            </div>
                
            <textarea 
                value={storeChat.getTextarea()}
                onChange={(e)=>{
                    checkWrite(e.target.value)
                    storeChat.setTextarea(e.target.value)}}
                onKeyDown={(e)=>{
                    if(!(/Mobile/).test(navigator.userAgent))
                        if(e.key=='Enter'&& !e.shiftKey){
                            checkWrite('');setter(input);
                        }
                    }}
                type="text" />
            <img src={send}  onClick={()=>{checkWrite('');setter(input);}}alt="" />
        </div>}
     
    </div>
    
    
})
export default ChatConversation

