import { observer } from "mobx-react-lite"
import store from "../../store/store"
import { config } from "../../utils/config"
import { useState } from "react"
import rem from '../../assets/rem.png'
import { onHide4 } from "../../utils/functionsChat/hides"
const FilesModal=observer(()=>{
    const [c1,setC1]=useState(false)
    const [c2,setC2]=useState(false)
    if(!c2 && c1){
        onHide4()
    }
    return <div className="ms_modal">
        <div className="msm_body">
            <img className="remove"src={rem} alt="" onClick={()=>{onHide4();setC1(false);setC2(false)}}/>
            <div className="ms_body">
                {store.getFiles().map(v=>{if(v!=null)
                   return <div className="member">
                     <a target="_blank" href={config.backHost+'/'+v}>
                        {v}
                    </a>
                    </div>
                })}

            </div>
        </div>
    </div>
})
export default FilesModal