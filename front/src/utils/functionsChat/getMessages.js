
import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { axiosOb } from "../functions"
import storeChat from "../../store/storeChat"
import { api } from "../API"

export async function getChatMessages(){
    let chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
    try {
        const res=await axiosOb(api.backHost+api.chat.way+api.chat.getChatMessages,{userid,chatid},{chatid:localStorage.getItem('chatid')})
        res.data.map(v=>{
        let avtor=null

        for(let i of store.getMembers()){
            if(i.id==v.Sender.sender){
                avtor=i
            }
        }
        if(!avtor){
            avtor={}
            avtor['avatar']=null
            avtor['name']='none'
            avtor['sername']='none'
            avtor['nickname'] ='none'
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