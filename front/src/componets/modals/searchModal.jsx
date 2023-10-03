import { useEffect, useState } from 'react'
import search from '../../assets/search.png'
import {config} from '../../utils/config'
import rem from '../../assets/rem.png'
import store from '../../store/store'
import SearchPeople from '../SearchPeople'
import { axiosOb } from '../../utils/functions'
export default function SearchModal({onHide}){
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    const [s,setSearch]=useState('')
    const [people,setPeople]=useState([])
    const [err,setErr]=useState(false)
    if(!c2 && c1){
        onHide()
    }
    async function serch(){
        if(s==0){
            setPeople([])
        }
        try {
            setErr(false)
            const result=await axiosOb(config.backHost+config.apiSearch,{text:s})
            setPeople(result.data)
        } catch (error) {
            if(error.code=='ERR_NETWORK'){
                setErr(true)
            }
        }
   
    }
    return <div className="searchModal" onClick={()=>{setC1(!c1)}}>
        <div className="modal" onClick={()=>{setC2(!c2)}}>
            <img className="remove"src={rem} alt="" onClick={()=>{onHide();setC1(false);setC2(false)}}/>
            <div className="search_container">
                <div>
                    <input value={s} onChange={(e)=>{setSearch(e.target.value)}} type="search" placeholder='Поиск'/>
                    <img src={search} onClick={serch} alt="" />
                </div>
            </div>
            <div className='line'></div>
            <div className='body_s'>
                {err && <p style={{marginTop: '2rem',fontFamily: 'sans-serif'}}>В данный момент сервер недоступен. Подождите некоторое время</p>}
            {people.map((v)=>{
                    return <SearchPeople key={v.nickname}v={v}></SearchPeople>
                })}
            </div>
            <p onClick={()=>{store.setCanal(true);onHide()}}>Создать беседу</p>

        </div>
    </div>
}