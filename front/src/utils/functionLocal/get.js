import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { axiosOb } from "../functions"
import { api } from "../API"

export  async function get(room){
    try {
        const r= await axiosOb(
            api.backHost+api.chat.way+api.chat.check,
            {
                nick1: (store.getAPerson()?store.getAPerson():localStorage.getItem('Aperson')),
                nick2: jwtDecode(localStorage.getItem('token')).nickname,
                id1: (store.getAId()?store.getAId():localStorage.getItem('Aid')),
                id2:jwtDecode(localStorage.getItem('token')).id,
                mode:'locale',
                room
            })
            return r.data
    } catch (error) {
       throw error
    }
}