
import { routes } from "./routes"
import store from '../store/store'
import jwt from "jwt-decode"
import axios from "axios"
import { config } from "./config"
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
export function checkType(file){
    const type=file.name.split('.')[1]
    if(type=='jpg' || type=='png')
    return true
    return false
}
export  async function sendInfo(token,name,sername,tel,nick,date,file,setUrl){
    try {
        const r=await axios.post(config.backHost+config.apiSetInfo,
            {
                id:token.id,
                name,
                sername,
                phone: tel, 
                nickname: nick, 
                date,
                avatar: file,
                oldavatar:token.avatar
            },
            {headers:{
                Authorization: 'Bearer '+store.getToken(), 
                "Content-Type": "multipart/form-data"}
            })
        localStorage.setItem('token',r.data.token)
        store.setToken(r.data)
        if(jwt(r.data.token).avatar!=undefined)
            setUrl(config.backHost+jwt(r.data.token).avatar)
        alert(r.data.message)
    } catch (error) {
       if(error.response.status==402){
        alert(error.response.data)
       }
       else
       console.log(error)
    }

 
}
export async function axiosOb(way,body){
    return await axios.post(way,body,{headers:{
        Authorization: 'Bearer '+store.getToken(), 
        "Content-Type": "multipart/form-data"}
    })
}
