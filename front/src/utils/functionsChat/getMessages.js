
import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { config } from "../config"
import { axiosOb } from "../functions"
import { routes } from "../routes"
import storeChat from "../../store/storeChat"

export async function getChatMessages(){
    let chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
    try {
        const res=await axiosOb(config.backHost+routes.chat+routes.getChatMessages,{userid,chatid})
        res.data.map(v=>{
        let avtor=null
        for(let i of store.getMembers()){
            if(i.id==v.Sender.sender){
                avtor=i
            }
        }
        store.setFiles([...store.getFiles(),v.Files.length>0?v.Files[0].file:null])
        store.setMessages([...store.getMessages(),{
            message:v.message,
            id:v.Sender.sender,
            file: v.Files.length>0?v.Files[0].file:null,
            avatar:avtor.avatar,
            name: avtor.name,
            sername:avtor.sername,
            nick: avtor.nickname,
            msgid: v.id
            }])
        storeChat.setLoaded(true)
       })
      
    } catch (error) {
        console.log(error)
    }
}