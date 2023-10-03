import { io } from "socket.io-client";
import { routes } from "./routes"
import store from '../store/store'
import jwt from "jwt-decode"
import axios from "axios"
import { config } from "./config"
import jwtDecode from "jwt-decode"
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
        const r=await axiosOb(config.backHost+config.apiSetInfo,
            {
                id:token.id,
                name,
                sername,
                phone: tel, 
                nickname: nick, 
                date,
                avatar: file,
                oldavatar:token.avatar
            })
        localStorage.setItem('token',r.data.token)
        store.setToken(r.data)
        if(jwt(r.data.token).avatar!=undefined)
            setUrl(config.backHost+jwt(r.data.token).avatar)
        return true
    } catch (error) {
       
        if(error.code=='ERR_NETWORK'){
            return false
        }
        else{
            return false
        }
       
    }

 
}
export async function axiosOb(way,body){
    return await axios.post(way,body,{headers:{
        Authorization: 'Bearer '+store.getToken(), 
        "Content-Type": "multipart/form-data"}
    })
}
export async function setVision(value,chatid,check){
    try {
        return await axiosOb(config.backHost+routes.chat+routes.setVision,{value,chatid,check})
    } catch (error) {
        console.log(error)
    }
}

export  function inicialSocket(){
    const socket=io(config.backHost)
    socket.connect()
    socket.emit('connection')
    socket.emit('@connect',{message:jwtDecode(store.getToken()).id})
    store.setSocket(socket)
    socket.on('connect_error',(e)=>{
        console.log('Сервер недоступен')
    })
    socket.on('connect',()=>{
        console.log('Подключен')
    })
    return socket
}
export function setSocket(){
    let socket
    if(!store.getSocket()){
        
            socket=inicialSocket()
            socket.emit('@createMLRoom',{message:jwtDecode(localStorage.getItem('token')).id})
        
        
        return socket
    }
    else{
        if(!store.getSocket().connected && store.getSocket().recovered==undefined ){

            const s=store.getSocket()
            s.connect()
            store.setSocket(s)
        }
        
        return store.getSocket()
    }
}
