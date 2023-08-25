import HeaderML from '../componets/HeaderML'
import MessagesStroke from '../componets/MessageStroke'
export default function MessagesList(){
    return <div className="container_c">
        <HeaderML></HeaderML>
        <div className='body_c'>
           {[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10].map((v)=>{return <MessagesStroke/>})}
        </div>
    </div>
}