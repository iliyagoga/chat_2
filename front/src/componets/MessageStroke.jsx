import AutInfoBlock from './AutInfoBlock'
import chevron from '../assets/Group 1.png'
export default function MessageStroke(){
    return <div className='message_stroke'>
        <AutInfoBlock></AutInfoBlock>
        <p>dsfdsfdsfdsfdsfdsfdsfdsfsdfd</p>
        <div className='visible'>
            <img src={chevron} alt="" />
        </div>
    </div>
}