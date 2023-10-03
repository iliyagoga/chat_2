import { observer } from "mobx-react-lite"
import store from "../../store/store"
import { config } from "../../utils/config"
import ava from '../../assets/def_ava.png'
import { useState } from "react"
import rem from '../../assets/rem.png'
import { onHide3 } from "../../utils/functionsChat/hides"
const MembersModal=observer(({onHide,memberModal})=>{
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    if(!c2 && c1){
        onHide3()
    }
    return <div className="ms_modal">
        <div className="msm_body">
            <img className="remove"src={rem} alt="" onClick={()=>{onHide3();setC1(false);setC2(false)}}/>
            <div className="ms_body">
                {store.getMembers().map(v=>{
                   return <div className="member" onClick={()=>{
                    onHide3()
                    memberModal({
                        avatar:v.avatar,
                        date:v.date,
                        phone:v.phone,
                        name:v.name,
                        sername: v.sername,
                        nickname:v.nickname
                    })

                   }}>
                        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" />
                        <p>@{v.nickname}</p>
                        <h3>{v.Roles[0].role}</h3>
                    </div>
                })}

            </div>
        </div>
    </div>
})
export default MembersModal