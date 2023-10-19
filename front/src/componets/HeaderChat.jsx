import AutorInfoBlock from './AutInfoBlock'
import '../styles/css/sass.css'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import storeChat from '../store/storeChat'
import { setSubscribe } from '../utils/functionsChat/setSubscribe'
import { denySubscribe } from '../utils/functionsChat/denySubscribe'
import { checkSubscribe } from '../utils/functionsChat/checkSubscribe'
import { useEffect } from 'react'
const HeaderChat =observer(()=>{
    const nav=useNavigate()
    useEffect(()=>{
        checkSubscribe(nav)
   },[])

    

    return <div className='header_chat'>
        <p className="mess" onClick={()=>{store.getReload(true);nav('/messages')}}>cообщения</p>
        <div onClick={()=>{storeChat.setMl(true)}}><AutorInfoBlock></AutorInfoBlock></div>
        {!store.getCheckSubscribe()&&<p className='sub1' onClick={setSubscribe}>Подписаться</p>}
        {store.getCheckSubscribe()&&<p className='sub2' onClick={denySubscribe}>Вы подписаны</p>}
    </div>
})
export default HeaderChat