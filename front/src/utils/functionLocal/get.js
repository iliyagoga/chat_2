import jwtDecode from "jwt-decode"
import store from "../../store/store"
import { config } from "../config"
import { axiosOb } from "../functions"

export  async function get(room){
    try {
        const r= await axiosOb(
            config.backHost+config.check,
            {
                nick1: (store.getAPerson()?store.getAPerson():localStorage.getItem('Aperson')),
                nick2: jwtDecode(localStorage.getItem('token')).nickname,
                id1: (store.getAId()?store.getAId():localStorage.getItem('Aid')),
                id2:jwtDecode(localStorage.getItem('token')).id,
                mode:'locale',
            room})
            return r.data
    } catch (error) {
       throw error
    }
}