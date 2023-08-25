import { useState } from 'react'
import grid from '../assets/grid.png'
import pencil from '../assets/pencil.png'
import '../styles/css/sass.css'
import SearchModal from './modals/searchModal'
import MiniModal from './modals/minimodal'
export default function HeaderML(){
    const [check,setCheck]=useState(false)
    const [c1,setC1]=useState(false)
    function addmodal(){
        setCheck(!check)
    }
    function addmodal2(){
        setC1(!c1)
    }
    return <div className='header hml'>
        <div className='grid' onClick={addmodal2}>
            <img src={grid} alt="" />
        </div>
        <div className='list'>
            <select>
                <option value="def">списки чатов</option>
            </select>
        </div>
        <div className='pencil' onClick={addmodal}>
            <img src={pencil} alt="" />
        </div>
        {check&&<SearchModal onHide={addmodal}></SearchModal>}
        {c1&&<MiniModal onHide={addmodal}></MiniModal>}
    </div>
}