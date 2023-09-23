import { useState } from 'react'
import grid from '../assets/grid.png'
import pencil from '../assets/pencil.png'
import search from '../assets/search.png'
import '../styles/css/sass.css'
import SearchModal from './modals/searchModal'
import MiniModal from './modals/minimodal'
import CreateCanal from './modals/createCanal'
import store from '../store/store'
import { observer } from 'mobx-react-lite'
const HeaderML =observer(()=>{
    const [check,setCheck]=useState(false)
    const [c1,setC1]=useState(false)
    function addmodal(){
        setCheck(!check)
    }
    function addmodal2(){
        setC1(!c1)
    }
    function addmodal3(){
        store.setCanal(!store.getCanal())
    }
    return <div className='header hml'>
        <div className='grid' onClick={addmodal2}>
            <img src={grid} alt="" />
        </div>
        
            <div className='pencil' onClick={addmodal}>
                <img src={search} alt="" />
            </div>
        
        {check&&<SearchModal onHide={addmodal} ></SearchModal>}
        {c1&&<MiniModal onHide={addmodal}></MiniModal>}
        {store.getCanal()&& <CreateCanal onHide={addmodal3}></CreateCanal>}
    </div>
})
export default HeaderML