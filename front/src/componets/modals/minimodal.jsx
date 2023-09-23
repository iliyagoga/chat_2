import { useNavigate } from "react-router-dom"
import { routes } from "../../utils/routes"

export default function MiniModal(){
const nav=useNavigate()
    return <div className="m">
        <div onClick={()=>{nav(routes.profile)}}>
            Профиль
        </div>
    </div>
}