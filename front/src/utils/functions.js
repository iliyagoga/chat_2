import { io } from "socket.io-client";
import { routes } from "./routes"
import store from '../store/store'
import jwt from "jwt-decode"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { api } from "./API";
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
        const r=await axiosOb(api.backHost+api.profile.way+api.profile.setInfo,
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
            setUrl(api.backHost+'/'+jwt(r.data.token).avatar)
        return true
    } catch (error) {
        throw error
    }
}

export async function axiosOb(way,body,hs={}){
    const copy= {Authorization: 'Bearer '+store.getToken(), 
    "Content-Type": "multipart/form-data",
    ID:jwtDecode(localStorage.getItem('token')).id}
    return await axios.post(way,body,{headers:{...copy,...hs}
    })
}



export  function inicialSocket(){
    const socket=io(api.backHost,{
        auth:{
            token: localStorage.getItem('token'),
            id: jwtDecode(localStorage.getItem('token')).id
        }
    })

    socket.connect()
    socket.emit('connection')
    socket.emit('@connect',{message:jwtDecode(store.getToken()).id})
    store.setSocket(socket)
    socket.on('connect_error',(e)=>{
        console.log('Сервер недоступен',e)
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
