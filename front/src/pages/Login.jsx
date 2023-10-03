import { useEffect, useState } from "react"
import axios from 'axios'
import { config } from "../utils/config"
import { routes } from "../utils/routes"
import { useNavigate } from "react-router-dom"
import store from "../store/store"
import { observer } from "mobx-react-lite";
import Alert from "../componets/alert"
const Login=observer(({l})=>{
    const nav=useNavigate()
    const [log,setLogin]=useState('')    
    const [pass,setPass]=useState('')
    const [pass2,setPass2]=useState('')
    const [err,setErr]=useState(false)
    const [u,setU]=useState(false)
    const [text,setText]=useState('')
    function onHide(){
        setErr(false)
    }

    function onHide2(){
        setU(false)
    }

    async function login(){
        let r=null
        if(log.length>0 && pass.length>0){
            if(l){
                if(pass==pass2){
                    try {
                       await  axios.post(config.backHost+config.apiReg,{nickname: log,password:pass}).then((data)=>{
                            localStorage.setItem('token',data.data)
                            store.setToken(data.data)
                            alert('Пользователь зарегистрирован')
                            nav(routes.messages)
                        })
                    } catch (error) {
                        if(error.code=='ERR_NETWORK'){
                            setErr(true)
                        }
                        else{
                            setText(error.response.data)
                            setU(true)
                        }
                    }
                
                }
                else{
                    alert('Пароли не сходятся')
                }
            }
            else{
                try {
                    await axios.post(config.backHost+config.apiLogin,{nickname: log,password:pass}).then((data)=>{
                        localStorage.setItem('token',data.data)
                        store.setToken(data.data)
                        alert('Вы вошли')
                        nav(routes.messages)
                    })
                } catch (error) {
                    if(error.code=='ERR_NETWORK'){
                        setErr(true)
                    }
                    else{
                        setText(error.response.data)
                        setU(true)
                    }
                }
            }
        }else{
            alert('Заполните необходимые поля')
        }
    }
    return <div className="container">
        {err && <Alert text={'В данный момент это невозможно, попробуйте позже'} onHide={onHide}></Alert>}
        {u && <Alert text={text} onHide={onHide2}></Alert>}
    <div className="login">
        <h2>{l?'Регистрация':'Вход'}</h2>
        <div>
            <label htmlFor="login">Логин</label>
            <input value={log} onChange={(e)=>{setLogin(e.target.value)}}type="text" id='login'placeholder="Логин"/>
        </div>
        <div>
            <label htmlFor="pass">Пароль</label>
            <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" id='pass'placeholder="Пароль"/>
        </div>
       { l&&<div>
            <label htmlFor="rpass">Повтор пароля</label>
            <input value={pass2} onChange={(e)=>{setPass2(e.target.value)}} type="password" id='rpass' placeholder="Повтор пароля"/>
        </div>}
        
        <a onClick={login}>{l?'Регистрация':'Войти'}</a>
        {l&&<h3 onClick={()=>{
            nav('/login')
        }}>Вход</h3>}
         {!l&&<h3 onClick={()=>{
            nav('/registration')
        }}>Регистрация</h3>}
    </div>
    </div>

})
export default Login