import { useNavigate } from 'react-router-dom'
import ava from '../assets/def_ava.png'
import { config } from '../utils/config'
import { routes } from '../utils/routes'
import store from '../store/store'
export default function SearchPeople({v}){
    const nav=useNavigate()
    return <div className="searchperson" onClick={()=>{
            nav(routes.conversation2+v.nickname)
            store.setAPerson(v.nickname)
            store.setAId(v.id)
            console.log(v)
    }}>
        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" />
        <p>@{v.nickname}</p>
    </div>
}