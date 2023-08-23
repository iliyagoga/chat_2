import { useState } from 'react'
import grid from '../assets/grid.png'
import pencil from '../assets/pencil.png'
import '../styles/css/sass.css'
import SearchModal from './modals/searchModal'
export default function HeaderML(){
    const [check,setCheck]=useState(false)
    function addmodal(){
        setCheck(!check)
    }
    return <div className='header hml'>
        <div className='grid'>
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
    </div>
}