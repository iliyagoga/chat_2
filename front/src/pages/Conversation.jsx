import HeaderCon from "../componets/HeaderCon";
import send from '../assets/send.png'
import file from '../assets/file.png'
export default function Conversation(){
    return <div className="container_con">
        <HeaderCon check={false}></HeaderCon>
        <p className="status">Печатает...</p>
        <div className="body">
            <div className="b">
                {[1,2,3,4,5,2,3,4,5,2,3,'4432 423 34 34 32432 432 fdfds dsfds fdf 4432 423 34 34 32432 432 fdfds dsfds fdf 4432 423 34 34 32432 432 fdfds dsfds fdf 4432 423 34 34 32432 432 fdfds dsfds fdf4432 423 34 34 32432 432 fdfds dsfds fdf',5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5].map((v,i)=>{
                    if(i%2==0)
                    return <div className="right">{v}</div>
                    return <div className="left">{v}</div>

                    })}
            </div>
        </div>
        <div className='intext'>
            <img src={file} alt="" />
            <textarea type="text" />
            <img src={send} alt="" />
        </div>
    </div>
}

