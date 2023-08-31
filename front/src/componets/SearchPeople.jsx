import ava from '../assets/def_ava.png'
import { config } from '../utils/config'
export default function SearchPeople({v}){
    return <div className="searchperson" >
        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" />
        <p>@{v.nickname}</p>
    </div>
}