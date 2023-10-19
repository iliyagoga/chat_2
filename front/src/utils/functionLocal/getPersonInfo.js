import jwtDecode from "jwt-decode";
import store from "../../store/store";
import { axiosOb } from "../functions";
import { config } from "../config";
import { routes } from "../routes";
import storeLocal from "../../store/storeLocal";

export  async function getPersonInfo(){

    const pid=store.getAId()?store.getAId():localStorage.getItem('Aid')
    try {
        const result=await axiosOb(config.backHost+routes.chat+routes.getPersonInfo,{pid})
        storeLocal.setPerson(result.data)
    } catch (error) {
        throw error
    }
}