import AutInfoBlock from './AutInfoBlock'
import chevron from '../assets/Group 1.png'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils/routes'
import store from '../store/store'
export default function MessageStroke({v}){
    const nav=useNavigate()
    return <div className='message_stroke' onClick={()=>{
        store.setJoinRoom(v.room)
        nav(routes.conversationLocal2+v.nickname)
        store.setAPerson(v.nickname)
        store.setAId(v.id)

        
    }}>
        <AutInfoBlock nickname={v.nickname} avatar={v.avatar}></AutInfoBlock>
        <p>{v.message.slice(0,50)}...</p>
        <div className='visible'>
            <img src={chevron} alt="" />
        </div>
    </div>
}