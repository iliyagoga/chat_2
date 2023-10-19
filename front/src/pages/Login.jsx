import { useEffect, useState } from "react"
import axios from 'axios'
import { config } from "../utils/config"
import { routes } from "../utils/routes"
import { useNavigate } from "react-router-dom"
import store from "../store/store"
import { observer } from "mobx-react-lite";
import Alert from "../componets/alert"
import storeLogin from "../store/storeLogin"
import { login } from "../utils/functionsChat/login"
const Login=observer(({l})=>{
    const nav=useNavigate()

    function onHide(){
        storeLogin.setErr(false)
    }

    function onHide2(){
        storeLogin.setU(false)
    }

    
    return <div className="container">
        {storeLogin.getErr() && <Alert text={'В данный момент это невозможно, попробуйте позже'} onHide={onHide}></Alert>}
        {storeLogin.getU() && <Alert text={storeLogin.getText()} onHide={onHide2}></Alert>}
    <div className="login">
        <h2>{l?'Регистрация':'Вход'}</h2>
        <div>
            <label htmlFor="login">Логин</label>
            <input value={storeLogin.getLog()} onChange={(e)=>{storeLogin.setLog(e.target.value)}}type="text" id='login'placeholder="Логин"/>
        </div>
        <div>
            <label htmlFor="pass">Пароль</label>
            <input value={storeLogin.getPass()} onChange={(e)=>{storeLogin.setPass(e.target.value)}} type="password" id='pass'placeholder="Пароль"/>
        </div>
       { l&&<div>
            <label htmlFor="rpass">Повтор пароля</label>
            <input value={storeLogin.getPass2()} onChange={(e)=>{storeLogin.setPass2(e.target.value)}} type="password" id='rpass' placeholder="Повтор пароля"/>
        </div>}
        
        <a onClick={()=>{login(nav,l)}}>{l?'Регистрация':'Войти'}</a>
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