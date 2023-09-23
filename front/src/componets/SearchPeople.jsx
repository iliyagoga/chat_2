import { useNavigate } from 'react-router-dom'
import ava from '../assets/def_ava.png'
import { config } from '../utils/config'
import { routes } from '../utils/routes'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
const SearchPeople = observer(({v})=>{
    const nav=useNavigate()
    return <div className="searchperson" onClick={()=>{
        if(v.type==undefined){
            nav(routes.conversationLocal2+v.nickname)
            store.setAPerson(v.nickname)
            store.setAId(v.id)
        }
        else{
            if(v.type=='chat'){
                nav(routes.conversationChat2+v.name)
                store.setChatId(v.id)
            }
        }
           
        
            
            
    }}>
        <img src={v.avatar?config.backHost+v.avatar:ava} alt="" />
        <p>@{v.nickname||v.name}</p>
    </div>
})
export default SearchPeople