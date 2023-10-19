import { observer } from "mobx-react-lite"
import store from "../../store/store"
import { config } from "../../utils/config"
import ava from '../../assets/def_ava.png'
import { useState } from "react"
import rem from '../../assets/rem.png'
import { onHide3 } from "../../utils/functionsChat/hides"
import moot_grey from '../../assets/moot1.png'
import moot_red from '../../assets/moot_red.png'
import jwtDecode from "jwt-decode"
import { setMoot } from "../../utils/functionsChat/setMoot"
import storeChat from "../../store/storeChat"
const MembersModal=observer(({onHide,memberModal})=>{
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    const userid=jwtDecode(localStorage.getItem('token')).id
    if(!c2 && c1){
        onHide3()
    }
    const adminId=store.getMembers().find((r)=>{return r.Roles[0].role=='admin'}).id
    return <div className="ms_modal">
        <div className="msm_body">
            <img className="remove"src={rem} alt="" onClick={()=>{onHide3();setC1(false);setC2(false)}}/>
            <div className="ms_body">
                {store.getMembers().map(v=>{
                   return <div className="member" >
                    <div  className='mr' onClick={()=>{
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
                        {v.Roles[0].role!='admin'&&adminId==userid&&<img 
                        onClick={()=>{setMoot(v.id,localStorage.getItem('chatid'))}} 
                        className="ms_img"  
                        title={v.Bans[0]!=undefined?'Разбанить':'Забанить'} 
                        src={v.Bans[0]!=undefined?moot_red:moot_grey}></img>}
                    </div>
                })}

            </div>
        </div>
    </div>
})
export default MembersModal