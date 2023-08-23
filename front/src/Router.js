import {Route, Routes} from 'react-router-dom'
import {routes} from './utils/routes'
import MessagesList from '../src/pages/MessagesList'
import Conversation from './pages/Conversation'
import Login from './pages/Login'
import Profile from './pages/Profile'
export default function Router(){
    return <Routes>
        <Route path={routes.messages} element={<MessagesList/>}></Route>
        <Route path={routes.conversation} element={<Conversation/>}></Route>
        <Route path={routes.login} element={<Login l={false}/>}></Route>
        <Route path={routes.profile} element={<Profile/>}></Route>
        
    </Routes>
}