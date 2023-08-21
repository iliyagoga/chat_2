import HeaderML from '../componets/HeaderML'
import MessagesStroke from '../componets/MessageStroke'
export default function MessagesList(){
    return <div className="container">
        <HeaderML></HeaderML>
        <div className='body'>
           {[1,2,3,4,5].map((v)=>{return <MessagesStroke/>})}
        </div>
    </div>
}