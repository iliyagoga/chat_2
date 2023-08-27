import { useEffect, useState } from "react"
import axios from 'axios'
import { config } from "../utils/config"
import { routes } from "../utils/routes"
import { useNavigate } from "react-router-dom"
import store from "../store/store"
import { observer } from "mobx-react-lite";
const Login=observer(({l})=>{
    const nav=useNavigate()
    const [log,setLogin]=useState('')    
    const [pass,setPass]=useState('')
    const [pass2,setPass2]=useState('')
    async function login(){
        let r=null
        if(log.length>0 && pass.length>0){
            if(l){
                if(pass==pass2){
                    axios.post(config.backHost+config.apiReg,{nickname: log,password:pass}).then((data)=>{
                        localStorage.setItem('token',data.data)
                        store.setToken(data.data)
                        alert('Пользователь зарегистрирован')
                        nav(routes.messages)
                    }).catch((err)=>alert(err.response.data))
                }
                else{
                    alert('Пароли не сходятся')
                }
            }
            else{
                axios.post(config.backHost+config.apiLogin,{nickname: log,password:pass}).then((data)=>{
                    localStorage.setItem('token',data.data)
                    store.setToken(data.data)
                    alert('Вы вошли')
                    nav(routes.messages)
                }).catch((err)=>alert(err.response.data))
            }
        }else{
            alert('Заполните необходимые поля')
        }
    }
    return <div className="container">
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
    </div>
    </div>

})
export default Login