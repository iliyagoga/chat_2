import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { axiosOb } from "../functions"
import { api } from "../API"

export  async function checkSubscribe(nav){
    const userid=jwtDecode(localStorage.getItem('token')).id
    try {
        const res= await axiosOb(api.backHost+api.chat.way+api.chat.checkSubscribe,{userid,chatid:localStorage.getItem('chatid')})
        store.setCheckSubscribe(res.data)

    } catch (error) {
        if(error.code=='ERR_NETWORK'){
            nav('/messages')
        }

    }
    
}