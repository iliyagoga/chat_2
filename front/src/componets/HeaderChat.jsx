
import '../styles/css/sass.css'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
import AutorInfoBlock from './AutInfoBlock'
import axios from 'axios'
import { config } from '../utils/config'
import { routes } from '../utils/routes'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { axiosOb } from '../utils/functions'
const HeaderChat =observer(()=>{
    const [sub,setSub]=useState(false)
    const userid=jwtDecode(store.getToken()).id
    async function checkSubscribe(){
        const res= await axiosOb(config.backHost+routes.chat+routes.checkSubscribe,{userid,chatid:store.getChatId()})
        store.setCheckSubscribe(res.data)
        setSub(res.data)
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
        <AutorInfoBlock></AutorInfoBlock>
        {!sub&&<p className='sub1' onClick={setSubscribe}>Подписаться</p>}
        {sub&&<p className='sub2' onClick={denySubscribe}>Вы подписаны</p>}
    </div>
})
export default HeaderChat