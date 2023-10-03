import { useEffect, useState } from 'react'
import ava from '../../assets/def_ava.png'
import light_file from '../../assets/light_file.png'
import people from '../../assets/people.png'
import locked from '../../assets/locked.png'
import unlocked from '../../assets/unlocked.png'
import visible from '../../assets/visible.png'
import unvisible from '../../assets/unvisible.png'
import infoo from '../../assets/info.png'
import rem from '../../assets/rem.png'
import store from '../../store/store'
import {  sendInfo, setVision } from '../../utils/functions'
import { observer } from 'mobx-react-lite'
import jwtDecode from 'jwt-decode'
import { config } from '../../utils/config'
import { onHide2 } from '../../utils/functionsChat/hides'
import storeChat from '../../store/storeChat'
const MemberList=observer(()=>{
    const info=store.getChatInfo()
    const setMf=storeChat.setMf
    const userid=jwtDecode(localStorage.getItem('token'))
    const check=storeChat.getCheck()
    const [click1,setClick1]=useState(false)
    const [click2,setClick2]=useState(false)
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    const [url,setUrl]=useState(null)
    const [file,setFile]=useState(null)
    const [save1,setSave1]=useState(false)
    const [save2,setSave2]=useState(false)
    const [save3,setSave3]=useState(false)
    const [inf,setInf]=useState(null)
    const [name,setName]=useState('')
    const [textarea,setTextarea]=useState('')
    if(!c2 && c1){
        onHide2()
    }
    const chatid=store.getChatId()
    async function setInfo(chatid,userid,name,info,file,socket){
        if(file){
            const cop=file.name.split('.')
            const type=cop[cop.length-1]
            socket.emit('@sendInfoClient',{chatid,userid:userid.id,name,info,file,type})
        }
        else{
            socket.emit('@sendInfoClient',{chatid,userid,name,info})
        }
     
    }
    return <div className="member_list" onClick={()=>{setC1(!c1)}}>
        <div className="m_list" onClick={()=>{setC2(!c2)}}>
            <div className='m_header'>
                <h1>Информация</h1>
                <img className="remove"src={rem} alt="" onClick={()=>{onHide2();setC1(false);setC2(false)}}/>
            </div>
           
           
            <div className="chat">
                    <div  className='ava' style={{position:'relative'}}>
                        <img src={url?url:((store.getChatInfo().avatar)?(config.backHost+ store.getChatInfo().avatar):ava)} alt="" />
                        {check=='admin'&&<input onChange={(e)=>{
                            if(check=='admin'){
                                setFile(e.target.files[0])
                                setUrl(URL.createObjectURL(e.target.files[0]))
                                setSave3(true)
                            }
                            }
                            }type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0'}}/>}
                    </div>
                <div>
                    {!click2 &&<h2 onClick={()=>{
                        if(check==='admin')
                        setClick2(!click2)}}>{name.length>0?name:info.name}</h2>}
                    {click2 && <input value={name} onChange={(e)=>{setName(e.target.value)}} 
                    onKeyDown={(e)=>{
                    if(e.code=='Enter'){
                        if(name.length>0){
                            if(name!=info.name){
                                setName(name)
                                setSave2(true)
                            }
                            else{
                                setSave2(false)
                            }
                        
                        }
                        else{
                            setSave2(false)
                        }
                        setClick2(!click2)
                    }
                    
                }}/>}
                    <p>{store.getMembers().length
                    +' '+(store.getMembers().length%10==1?'подписчик':(store.getMembers().length%10==2?'подписчика':(store.getMembers().length%10==3?'подписчика':(store.getMembers().length%10==4?'подписчика':'подписчиков'))))} </p>
                </div>
                
            </div>


            <div className='info' title='Информация о чате'>
                <div onClick={()=>{
                    if(check=='admin'){
                        setClick1(!click1);
                        if(!click1){setTextarea(textarea.length?textarea:info.info)
                        }}}
                    }>
                    <img src={infoo} alt="" />
                    {!click1&&<p>{textarea.length>0?textarea:info.info}</p>}
                </div>
                {click1&&<textarea onKeyDown={(e)=>{
                    if(e.code=='Enter'){
                        if(textarea!=info.info){
                            setTextarea(textarea)
                            setInf(textarea)
                            setSave1(true)
                        }
                        else{
                            setSave1(false)
                        }
                        setClick1(!click1)
                    }
                }}value={textarea} onChange={(e)=>{setTextarea(e.target.value)}}></textarea>} 
            </div>


            <div className='files' title='Файлы'>
                <div onClick={()=>{
                    onHide2()
                    storeChat.setMf(true)
                }}>
                    <img src={light_file} alt="" />
                    <p>Файлы</p>
                </div>
            </div>


            <div className='people' title='Подписчики'>
                <div onClick={()=>{onHide2();storeChat.setMs(true)}}>
                    <img src={people} alt="" />
                    <p>подписчики</p>
                </div>
            </div>


            { check=='admin'&& <div className='people'>
                {store.getChatInfo().moot&&<div onClick={()=>{
                  const r =store.getSocket().emit('@setMootClient',{chatid:chatid,value:!store.getChatInfo().moot,check:check})
                }}>
                    <img src={locked} alt="" />
                    <p>Без возможности писать подписчикам</p>
                </div>}
                {!store.getChatInfo().moot&&<div onClick={()=>{
                    const r =store.getSocket().emit('@setMootClient',{chatid:chatid,value:!store.getChatInfo().moot,check:check})
                }}>
                    <img src={unlocked} alt="" />
                    <p>Возможно писать подписчикам</p>
                </div>}
            </div>}


            { check=='admin'&& <div className='people'>
                {store.getChatInfo().vision&&<div onClick={()=>{
                    setVision(false,chatid,check).then(r=>{
                        if(r!=undefined){
                            if(r.data){
                                let u=Object.assign(store.getChatInfo())
                                u.vision=false
                                store.setChatInfo(u)
                            }
                        }
                    })

                }}>
                    <img src={visible} alt="" />
                    <p>Общий</p>
                </div>}
                {!store.getChatInfo().vision&&<div onClick={()=>{
                    setVision(true,chatid,check).then(r=>{
                        if(r!=undefined){
                            if(r.data){
                                let u=Object.assign(store.getChatInfo())
                                u.vision=true
                                store.setChatInfo(u)
                            }
                        }
                        
                    })
                }}>
                    <img src={unvisible} alt="" />
                    <p>Приватный</p>
                </div>}
            </div>}


           {(save1||save2||save3)&& <a onClick={()=>{setInfo(chatid,userid,name,inf,file,store.getSocket())}}className='def_button'>Сохранить</a>}
        </div>
    </div>
})
export default MemberList