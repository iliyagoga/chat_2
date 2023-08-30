
import { routes } from "./routes"
import store from '../store/store'
import jwt from "jwt-decode"
export const  l=(nav)=>{
    localStorage.removeItem('token')
    store.setToken('')
    nav(routes.login)
}
export const checkToken=()=>{
    let token
    try {
        token=jwt(store.getToken())
        return token
    } catch (error) {
        if( error instanceof Error){
            return false
        }
    }
}
