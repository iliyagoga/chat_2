import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { config } from "../config"
import { axiosOb } from "../functions"
import { routes } from "../routes"
import { get } from "./get"
import randomstring from 'randomstring'
import { getter } from "./getter"
import storeLocal from "../../store/storeLocal"
import { useNavigate } from "react-router-dom"

export async function inicial(idroom2){
    const mynickname=jwtDecode(store.getToken()).nickname
    const myavatar=jwtDecode(store.getToken()).avatar
    const socket=store.getSocket()
    const idroom=randomstring.generate()
    const myid=jwtDecode(store.getToken()).id
    let roomid
    try {
        const r=await get(idroom2)
        store.setJoinRoom(r.LocalId)
        roomid=r.LocalId
        axiosOb(config.backHost+routes.chat+routes.getLocalMessage,{LocalId: roomid}).then(r=>{
                store.setMessages([])
                r.data.map(v=>{store.setMessages([...store.getMessages(),{message:v.message,id:v.Sender.sender,msgid: v.id,file: v.Files[0]?v.Files[0].file:null}])})
                storeLocal.setLoaded(true)
        })
        socket.emit('@joinRoom',{message:{room:roomid,personId:store.getAId(),chatId:idroom,nickname:mynickname,myavatar:myavatar,myid:myid}})
        getter()
    } catch (error) {
        if(error.code=='ERR_NETWORK'){
            throw error
        }
        
    }

   
}