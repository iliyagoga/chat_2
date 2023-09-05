import ava from '../assets/def_ava.png'
import { config } from '../utils/config'
export default function AutorInfoBlock({nickname,avatar}){
    return <div className="info_block">
        <div className='img'>
            <img src={avatar?config.backHost+ avatar:ava} alt="" />
        </div>
        <div className='name'>
           {nickname}
        </div>
    </div>
}