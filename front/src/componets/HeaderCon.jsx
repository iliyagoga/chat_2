import AutorInfoBlock from "./AutInfoBlock"
import del from '../assets/delete.png'
import pencil from '../assets/pencil.png'
export default function HeaderCon({check}){
    const var1=<div className="header_con">
        <AutorInfoBlock></AutorInfoBlock>
    </div>
    const var2=<div className="header_con two">
        <img src={pencil} alt="" />
        <img src={del} alt="" />
    </div>
    return <>{check? var1:var2}</>
}