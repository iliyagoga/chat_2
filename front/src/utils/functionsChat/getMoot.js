import jwtDecode from "jwt-decode";
import store from "../../store/store";
import storeChat from "../../store/storeChat";

export function getMoot(){
    const socket=store.getSocket()
    const myid=jwtDecode(localStorage.getItem('token')).id
    socket.on('@getMoot',(r)=>{
        if(r.id==myid){
            storeChat.setBan(r.ban)
        }
       
    })
    socket.on('@getMoot2',(r)=>{
        const copy=store.getMembers()
        const stroke_copy=copy.find((v)=>{return v.id==r.id})
        let stroke=copy.find((v)=>{return v.id==r.id})
        if(stroke.Bans.length==0){
            const c={ban:r.ban,id:r.id}
            stroke.Bans[0]=c

        }
        else{
            stroke.Bans=[]
  
        }
      
   
       
    })

}