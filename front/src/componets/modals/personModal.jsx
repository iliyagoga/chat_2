import { observer } from "mobx-react-lite";
import ava from '../../assets/def_ava.png'
import phonee from '../../assets/phone.png'
import cal from '../../assets/cal.png'
import {config} from '../../utils/config'
import rem from '../../assets/rem.png'
import { useState } from "react";
import storeLocal from "../../store/storeLocal";

const PersonModal =observer(({onHide})=>{
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(true)
    const {avatar,name,sername,nickname,date,phone}=storeLocal.getPerson()

    if(c2&&c1){
        onHide()
    }
    return <div className="member_modal" onClick={()=>{
        setC1(!c1)
    }}>
        <div className="m_modal" onClick={()=>{
            setC2(!c2)
        }}>
            <img className="remove"src={rem} alt="" onClick={()=>{onHide();setC1(false);setC2(false)}}/>
            <div className="prevue">
                <img src={avatar?config.backHost+avatar:ava} alt="" />
                <div>
                    <h2>@{nickname}</h2>
                    {sername&&<p>{(name&&name)+' '+sername}</p>}
                </div>
            </div>
            <div className="m_body">
                <div>
                    <img src={phonee} alt="" />
                    <h2>{phone?phone:''}</h2>
                </div>
                <div>
                    <img src={cal} alt="" />
                    <h2>{date?date:''}</h2>
                </div>
            </div>
        </div>

    </div>
})
export default PersonModal