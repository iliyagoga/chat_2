import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"
import { axiosOb } from "../functions"
import { api } from "../API"

export async function getAllMembers(){
    let chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
    try {
        const res =await axiosOb(api.backHost+api.chat.way+api.chat.getAllMembers,{userid,chatid},{chatid:localStorage.getItem('chatid')})
        res.data.map(v=>{if(v.id==userid){storeChat.setCheck(v.Roles[0].role)}})
        store.setMembers(res.data)
    } catch (error) {
        throw error
    }
}