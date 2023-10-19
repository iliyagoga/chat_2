import { observer } from "mobx-react-lite";
import rem from '../../assets/rem.png'
import ava from '../../assets/def_ava.png'
import { useState } from "react";
import jwtDecode from "jwt-decode";
import {config} from '../../utils/config'
import { routes } from "../../utils/routes";
import store from "../../store/store";
import { axiosOb } from "../../utils/functions";
import { onHide } from "../../utils/functionsChat/hides";
import Alert from '../alert'
const CreateCanal=observer(()=>{
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    const [name,setName]=useState('')
    const [info,setInfo]=useState('')
    const [file,setFile]=useState(null)
    const id= jwtDecode(store.getToken()).id
    const [url,setUrl]=useState(null)
    const [vi,setVi]=useState(true)
    const [err,setErr]=useState(false)
    function onHide(){
        store.setCanal(false)
    }
    function onHide2(){
        setErr(true)
        onHide()
    }
    if(!c2 && c1){
        onHide()
    }
    async function createChat(name,info,file,vision){
        let type=null
        if(file){
            type=file.name.split('.')
            type=type[type.length-1]
        }
        try {
            setErr(false)
            await axiosOb(config.backHost+routes.chat+routes.createChat,{name:name,info:info,file:file,type:type,id,vision})
            onHide()
        } catch (error) {
            console.log(error)
            if(error.code=='ERR_NETWORK'){
                setErr(true)
            }
        }
        

        
    }
    return <div className="canal_modal" onClick={()=>{setC1(!c1)}}> 
    {err && <Alert text={'В данный момент это невозможно'} onHide={onHide2}></Alert>}
                <div className="container_c" onClick={()=>{setC2(!c2)}}>
                <img className="remove"src={rem} onClick={()=>{onHide();setC1(false);setC2(false)}} alt="" />
                    <div  className='ava' style={{position:'relative'}}>
                        <img src={url?url:ava} alt="" />
                        <input onChange={(e)=>{
                            setFile(e.target.files[0])
                            setUrl(URL.createObjectURL(e.target.files[0]))}
                            }type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0'}}/>
                    </div>
                    <input onChange={(e)=>{setName(e.target.value)}} value={name}className="input" type="text" placeholder="Название канала"/>
                    <textarea onChange={(e)=>{setInfo(e.target.value)}} value={info} name="" id="" cols="30" rows="10" placeholder="Описание канала"></textarea>
                    <select className="type" value={vi} onChange={(e)=>{setVi(e.target.value)}}name="" id="">
                        <option value="true">Общий</option>
                        <option value="false">Приватный</option>
                    </select>
                    <a onClick={()=>{createChat(name,info,file,vi)}}>Создать</a>
                </div>
      
    </div>
})
export default CreateCanal