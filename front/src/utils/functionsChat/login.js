import axios from "axios"
import store from "../../store/store"
import storeLogin from "../../store/storeLogin"
import { config } from "../config"
import { routes } from "../routes"
import { api } from "../API"

export async function login(nav,l){
    let r=null
    if(storeLogin.getLog().length>0 && storeLogin.getPass().length>0){
        if(l){
            if(storeLogin.getPass()==storeLogin.getPass2()){
                try {
                   await  axios.post(api.backHost+api.login.way+api.login.reg,{nickname: storeLogin.getLog(),password: storeLogin.getPass()}).then((data)=>{
                        localStorage.setItem('token',data.data)
                        store.setToken(data.data)

                        nav(routes.messages)
                    })
                } catch (error) {
                    if(error.code=='ERR_NETWORK'){
                        storeLogin.setErr(true)
                    }
                    else{
                        storeLogin.setText(error.response.data)
                        storeLogin.setU(true)
                    }
                }
            
            }
            else{
                storeLogin.setText('Пароли не сходятся')
                storeLogin.setU(true)
            }
        }
        else{
            try {
                await axios.post(config.backHost+config.apiLogin,{nickname: storeLogin.getLog(),password: storeLogin.getPass()}).then((data)=>{
                    localStorage.setItem('token',data.data)
                    store.setToken(data.data)
                    storeLogin.setText('Вы вошли')
                    storeLogin.setU(true)
                    nav(routes.messages)
                })
            } catch (error) {
                if(error.code=='ERR_NETWORK'){
                    storeLogin.setErr(true)
                }
                else{
                    storeLogin.setText(error.response.data)
                    storeLogin.setU(true)
                }
            }
        }
    }else{
        storeLogin.setText('Заполните необходимые поля')
        storeLogin.setU(true)
    }
}