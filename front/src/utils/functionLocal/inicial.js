import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { axiosOb } from "../functions"
import { get } from "./get"
import randomstring from 'randomstring'
import { getter } from "./getter"
import storeLocal from "../../store/storeLocal"
import { api } from "../API"


export async function inicial(idroom2){
    const mynickname=jwtDecode(store.getToken()).nickname
    const myavatar=jwtDecode(store.getToken()).avatar
    const socket=store.getSocket()
    const idroom=randomstring.generate()
    const myid=jwtDecode(store.getToken()).id
    const pid=store.getAId()?store.getAId():localStorage.getItem('Aid')
    let roomid
    
    try {
        const r=await get(idroom2)
        store.setJoinRoom(r.LocalId)
        roomid=r.LocalId
        await axiosOb(api.backHost+api.chat.way+api.chat.getLocalMessage,{LocalId: roomid}).then(r=>{
                store.setMessages([])
                r.data.map(v=>{store.setMessages([...store.getMessages(),{message:v.message,id:v.Sender.sender,msgid: v.id,file: v.Files[0]?v.Files[0].file:null}])})
                storeLocal.setLoaded(true)
        })
        socket.emit('@joinRoom',{message:{room:roomid,personId:pid,chatId:idroom,nickname:mynickname,myavatar:myavatar,myid:myid}})
        getter()
   
    } catch (error) {
        if(error.code=='ERR_NETWORK'){
            throw error
        }
        
    }

   
}