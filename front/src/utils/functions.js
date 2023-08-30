
import { routes } from "./routes"
import store from '../store/store'
export const  l=(nav)=>{
    localStorage.removeItem('token')
    store.setToken('')
    nav(routes.login)
}
