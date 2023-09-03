import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {routes} from './utils/routes'
import MessagesList from '../src/pages/MessagesList'
import Conversation from './pages/Conversation'
import Login from './pages/Login'
import Profile from './pages/Profile'
import store from './store/store'
import { observer } from "mobx-react-lite";
import { checkToken, l } from './utils/functions'
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
    
    return <Routes>
        {store.getToken()&&<>
        <Route path={routes.messages} element={<MessagesList/>}></Route>
        <Route path={routes.conversation} element={<Conversation/>}></Route>
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