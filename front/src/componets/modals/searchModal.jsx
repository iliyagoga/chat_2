import { useEffect, useState } from 'react'
import search from '../../assets/search.png'
import rem from '../../assets/rem.png'
import SearchPeople from '../SearchPeople'
export default function SearchModal({onHide}){
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    if(!c2 && c1){
        onHide()
    }
    return <div className="searchModal" onClick={()=>{setC1(!c1)}}>
        <div className="modal" onClick={()=>{setC2(!c2)}}>
            <img className="remove"src={rem} alt="" onClick={()=>{onHide();setC1(false);setC2(false)}}/>
            <div className="search_container">
                <div>
                    <input type="search" placeholder='Поиск'/>
                    <img src={search} alt="" />
                </div>
            </div>
            <div className='line'></div>
            <div className='body_s'>
            {[1,2,3,4,5,6,7,8,9,10].map((v)=>{
                    return <SearchPeople></SearchPeople>
                })}
            </div>

        </div>
    </div>
}