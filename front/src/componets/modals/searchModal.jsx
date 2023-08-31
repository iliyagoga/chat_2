import { useEffect, useState } from 'react'
import search from '../../assets/search.png'
import axios from 'axios'
import {config} from '../../utils/config'
import rem from '../../assets/rem.png'
import store from '../../store/store'
import SearchPeople from '../SearchPeople'
export default function SearchModal({onHide}){
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    const [s,setSearch]=useState('')
    const [people,setPeople]=useState([])
    if(!c2 && c1){
        onHide()
    }
    async function serch(e){
        setSearch(e.target.value)
        const result=await axios.post(config.backHost+config.apiSearch,{text:e.target.value},{headers:{
            Authorization: 'Bearer '+store.getToken()}})
        setPeople(result.data)
    }
    return <div className="searchModal" onClick={()=>{setC1(!c1)}}>
        <div className="modal" onClick={()=>{setC2(!c2)}}>
            <img className="remove"src={rem} alt="" onClick={()=>{onHide();setC1(false);setC2(false)}}/>
            <div className="search_container">
                <div>
                    <input value={s} onChange={serch} type="search" placeholder='Поиск'/>
                    <img src={search} alt="" />
                </div>
            </div>
            <div className='line'></div>
            <div className='body_s'>
            {people.map((v)=>{
                    return <SearchPeople key={v.nickname}v={v}></SearchPeople>
                })}
            </div>

        </div>
    </div>
}