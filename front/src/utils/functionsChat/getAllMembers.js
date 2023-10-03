import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"
import { config } from "../config"
import { axiosOb } from "../functions"
import { routes } from "../routes"

export async function getAllMembers(){
    let chatid=store.getChatId()
    const userid =jwtDecode(store.getToken()).id
    try {
        const res =await axiosOb(config.backHost+routes.chat+routes.getAllMembers,{userid,chatid})
        res.data.map(v=>{if(v.id==userid){storeChat.setCheck(v.Roles[0].role)}})
        store.setMembers(res.data)
    } catch (error) {
        throw error
    }
}