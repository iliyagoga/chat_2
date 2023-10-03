
import rem from '../assets/rem.png'

export default function Alert({onHide, text}){
    return <div className="alert">
        <img className="remove"src={rem} alt="" onClick={onHide}/>
        <h2>{text}</h2>
    </div>
}