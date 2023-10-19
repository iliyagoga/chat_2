import ava from '../assets/def_ava.png'
import { config } from '../utils/config'
export default function P_Block({nickname,avatar}){
    return <div className="p_block">
        <div className='img'>
            <img src={avatar?config.backHost+ avatar:ava} alt="" />
        </div>

    </div>
}