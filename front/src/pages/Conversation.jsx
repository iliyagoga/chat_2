import HeaderCon from "../componets/HeaderCon";
import send from '../assets/send.png'
import file from '../assets/file.png'
import { observer } from "mobx-react-lite";
import store from "../store/store";
import jwtDecode from "jwt-decode";
import del from '../assets/delete.png'
import pencil from '../assets/pencil.png'
import { config } from "../utils/config";
import { useEffect, useRef } from "react";
import randomstring from 'randomstring'
import storeLocal from "../store/storeLocal";
import { setter } from "../utils/functionLocal/setter";
import { clickMessage } from "../utils/functionLocal/clickMessage";
import { redact } from "../utils/functionLocal/redact";
import { deleteMServer } from "../utils/functionLocal/deleteMServer";
import { redactMServer } from "../utils/functionLocal/redactMServer";
import { inicial } from "../utils/functionLocal/inicial";
import { actions } from "../utils/functionLocal/actions";
import { setSocket } from "../utils/functions";
import { clear } from "../utils/functionLocal/clear";
import { useNavigate } from "react-router-dom";
const Conversation =observer(()=>{
    const input=useRef()
    const b=useRef()
    const idroom2=store.getJoinRoom()?store.getJoinRoom():randomstring.generate()
    const myid=jwtDecode(store.getToken()).id
    let socket=setSocket()
    const nav=useNavigate()
    useEffect(()=>{ 
        inicial(idroom2).catch(error=>{
            nav('/message')
        })
        deleteMServer()
        redactMServer(input)
      return ()=>{clear()}
       
    },[])

    useEffect(()=>{
        b.current.scrollTo(0,b.current.scrollHeight)
    },[storeLocal.getLoaded()])
    
    useEffect(()=>{
        actions() 
    },[storeLocal.getTextarea()])
    
    useEffect(()=>{
        if(storeLocal.getEmitMessage()){
            b.current.scrollTo(0,b.current.scrollHeight)
            storeLocal.setEmitMessage(false)
        }

    },[storeLocal.getEmitMessage()])

    return <div className="container_con">
        {!storeLocal.getClc()?<HeaderCon></HeaderCon>:  
        <div className="header_con two">
            <img src={pencil}  onClick={()=>{redact()}}/>
            <img src={del} onClick={()=>{clickMessage()}} alt="" />
        </div>}
        <p className="status">{storeLocal.getAction()&&'Печатает..'}.</p>
        <div className="body">
            <div className="b" ref={b}>
                {store.getMessages().map((v,i)=>{
                    if(v.id!=myid)
                    return <div className="right" key={i} >{
                        <>{v.message}
                        <br></br> 
                        <a target="_blank" href={config.backHost+'/'+v.file}>
                            {v.file}
                        </a></>}</div>
                    return <div className="left" key={i} onClick={()=>{
                        storeLocal.setClc(!storeLocal.getClc());
                        store.setIndex(i);
                        storeLocal.setText(v.message);
                        storeLocal.setMgid(v.msgid)}}>{
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
                {(storeLocal.getFileValue())&&<div className="dele" title="удалить файл" onClick={()=>{
                    input.current.value=''
                    storeLocal.setFileValue(null)
                }}>
                    <img src={del} alt="" />
                </div>}
                <p>{storeLocal.getFileValue() && storeLocal.getFileValue().name}</p>
                <div style={{position:'relative'}} onKeyDown={(e)=>{if(e.key=='Enter'){
                setter(input,b)
            }}}>
                    <img src={file} alt="" />
                    <input ref={input}onChange={(e)=>{storeLocal.setFileValue(e.target.files[0])}} type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0',cursor:'pointer'}}/>
                </div>
            </div>
                
            <textarea value={storeLocal.getTextarea()}onChange={(e)=>{storeLocal.setTextarea(e.target.value)}}
            onKeyDown={(e)=>{
                if(!(/Mobile/).test(navigator.userAgent))
                    if(e.key=='Enter'){
                        setter(input,b)
                    }
                }}type="text" />
            <img src={send} onClick={()=>{setter(input,b)}} alt="" />
        </div>
    </div>
 
})
export default Conversation

