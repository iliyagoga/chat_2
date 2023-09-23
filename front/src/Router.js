import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {routes} from './utils/routes'
import MessagesList from '../src/pages/MessagesList'
import Conversation from './pages/Conversation'
import Login from './pages/Login'
import Profile from './pages/Profile'
import store from './store/store'
import { observer } from "mobx-react-lite";
import { checkToken, l } from './utils/functions'
import axios from 'axios'
import { config } from './utils/config'
import { useEffect } from 'react'
import ChatConversation from './pages/ChatConversation'
const Router=observer(()=>{
    const t=localStorage.getItem('token')
    const nav=useNavigate()
    if(t!=null){
        store.setToken(t)
        let token;
        token=checkToken(nav)
        if(!token){
            l(nav)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
        axios.post(config.backHost+routes.login2+routes.check,{token:localStorage.getItem('token')}).then((r)=>{
            if(!r.data){
                store.setToken(null)
                localStorage.removeItem('token')
                nav('/login')
            }
        })}
    },[])
    
    return <Routes>
        {store.getToken()&&<>
        <Route path={routes.messages} element={<MessagesList/>}></Route>
        <Route path={routes.conversationLocal} element={<Conversation/>}></Route>
        <Route path={routes.conversationChat} element={<ChatConversation/>}></Route>
        <Route path={routes.profile} element={<Profile/>}></Route>
        <Route path='/*' element={<Navigate to={routes.messages}/>}></Route>
        </>
        }
        {!store.getToken()&&<>
        <Route path={routes.login} element={<Login l={false}/>}></Route>
        <Route path={routes.reg} element={<Login l={true}/>}></Route>
        <Route path='/*' element={<Navigate to={routes.login}/>}></Route>
        </>
        }
        
    </Routes>
})
export default Router