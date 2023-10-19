import home from '../assets/home.png'
import leave from '../assets/leave.png'
import ava from '../assets/def_ava.png'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils/routes'
import {l} from '../utils/functions'
import { useState } from 'react'
import { config } from '../utils/config'
import jwt from 'jwt-decode'
import store from '../store/store'
import {observer} from 'mobx-react-lite'
import { checkType } from '../utils/functions'
import { sendInfo } from '../utils/functions'
import Alert from '../componets/alert'
const Profile=observer(()=>{
    const token=jwt(store.getToken())
    const nav=useNavigate()
    const [name,setName]=useState(token.name||'')
    const [sername, setSername]=useState(token.sername||'')
    const [tel,setTel]=useState(token.phone||null)    
    const [nick,setNick]=useState(token.nickname)
    const [date,setDate]=useState(token.date||null)
    const [url,setUrl]=useState((token.avatar&&(token.avatar!=undefined))?config.backHost+token.avatar:ava)
    const [file,setFile]=useState()
    const [err,setErr]=useState(false)
    const [u,setU]=useState(false)
    const [textErr,setTextErr]=useState('')

    function onHide(){
        setErr(false)
    }
    function onHide2(){
        setU(false)
    }
    return <div className="container_p">
        {err && <Alert text={textErr} onHide={onHide}></Alert>}
        {u && <Alert text={'Успешно'} onHide={onHide2}></Alert>}
        <div className="header_p">
            <img src={home} alt="" onClick={()=>{nav(routes.messages)}}/>
        </div>
        <div className='body_p'>
            <div className='leave' onClick={()=>{l(nav)}}>
                <img src={leave} alt="" />
            </div>
            <div className='info'>
                <div style={{position:'relative'}}>
                    <img src={url} alt="" />
                    <input onChange={(e)=>{
                        if(checkType(e.target.files[0])){
                            setFile(e.target.files[0])
                            setUrl(URL.createObjectURL(e.target.files[0]))
                        }
                        else
                        alert('Можно выбрать только файлы формата "jpg" и "png"')
                        }} type="file" style={{position:'absolute', width:'100%',left: 0,height:'100%',opacity:'0'}}/>
                </div>
                
                <div>
                    <p>{name} {sername}</p>
                    <p>{nick}</p>
                </div>
            </div>
            <div className='cont'>
                <div>
                    <label htmlFor="name">Имя</label>
                    <input value={name} onChange={(e)=>{
                            setName(e.target.value)}}type="text" id='name'placeholder="Имя"/>
                </div>
                <div>
                    <label htmlFor="sernmae">Фамилия</label>
                    <input value={sername} onChange={(e)=>{
                            setSername(e.target.value)}} type="text" id='sername'placeholder="Фамилия"/>
                </div>
                <div>
                    <label htmlFor="tel">Телефон</label>
                    <input value={tel} onChange={(e)=>{
                        setTel(e.target.value)}} type="tel" id='tel'placeholder="Телефон"/>
                </div>
                <div>
                    <label htmlFor="nick">Ник</label>
                    <input value={nick} onChange={(e)=>{
                        setNick(e.target.value)
                        }} type="text" id='nick'placeholder="Ник"/>
                </div>
                <div>
                    <label htmlFor="date">Дата рождения</label>
                    <input value={date} onChange={(e)=>{setDate(e.target.value)}} type="date" id='date' />
                </div>
            </div>
            
            <a onClick={()=>{
                sendInfo(token, name, sername, tel, nick, date, file, setUrl).then(r=>{setU(true)}).catch(err=>{
                    setErr(true);
                    if(err.code=='ERR_NETWORK'){
                        setTextErr('В данный момент это невозможно')
                    }
                    else{
                        setTextErr(err.response.data)
                    }
                    })
                }}>Сохранить</a>
        </div>
    </div>
})
export default Profile