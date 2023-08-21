import {Route, Routes} from 'react-router-dom'
import {routes} from './utils/routes'
import MessagesList from '../src/pages/MessagesList'
import Conversation from './pages/Conversation'
export default function Router(){
    return <Routes>
        <Route path={routes.messages} element={<MessagesList/>}></Route>
        <Route path={routes.conversation} element={<Conversation/>}></Route>
    </Routes>
}