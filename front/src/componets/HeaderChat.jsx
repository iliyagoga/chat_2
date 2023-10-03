import AutorInfoBlock from './AutInfoBlock'
import '../styles/css/sass.css'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
import { config } from '../utils/config'
import { routes } from '../utils/routes'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { axiosOb } from '../utils/functions'
import { useNavigate } from 'react-router-dom'
import storeChat from '../store/storeChat'
const HeaderChat =observer(()=>{
    const [sub,setSub]=useState(false)
    const nav=useNavigate()
    const userid=jwtDecode(localStorage.getItem('token')).id
    async function checkSubscribe(){
        try {
            const res= await axiosOb(config.backHost+routes.chat+routes.checkSubscribe,{userid,chatid:localStorage.getItem('chatid')})
            store.setCheckSubscribe(res.data)
            setSub(res.data)
        } catch (error) {
            if(error.code=='ERR_NETWORK'){
                nav('/messages')
            }

        }
        
    }
    function setSubscribe(){
        const socket=store.getSocket()
        const chatid =store.getChatId()
        socket.emit('@clientSetSubscribe',{chatid,userid})
        socket.on('@serverSetSubscribe',(req)=>{
            store.setCheckSubscribe(true)
            setSub(true)
        })
    }
    function denySubscribe(){
        const socket=store.getSocket()
        const chatid =store.getChatId()
        socket.emit('@clientDenySubscribe',{chatid,userid})
        socket.on('@serverDenySubscribe',(req)=>{
            store.setCheckSubscribe(false)
            setSub(false)
        })
    }
    checkSubscribe()
    return <div className='header_chat'>
        <p className="mess" onClick={()=>{store.getReload(true);nav('/messages')}}>cообщения</p>
        <div onClick={()=>{storeChat.setMl(true)}}><AutorInfoBlock></AutorInfoBlock></div>
        {!sub&&<p className='sub1' onClick={setSubscribe}>Подписаться</p>}
        {sub&&<p className='sub2' onClick={denySubscribe}>Вы подписаны</p>}
    </div>
})
export default HeaderChat