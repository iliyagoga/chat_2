import jwtDecode from "jwt-decode"
import store from "../../store/store"
import storeChat from "../../store/storeChat"
import randomstring from 'randomstring'
export const setter=(input)=>{
    const pid=randomstring.generate()

    const myinfo=jwtDecode(store.getToken())
    const userid =jwtDecode(store.getToken()).id
    const socket=store.getSocket()
    if(storeChat.getCheck){
        if(!storeChat.getRed()){
            if(storeChat.getFileValue()){
                socket.emit('@sendClientChat',{
                    message: storeChat.getTextarea(),
                    myinfo:{
                        avatar: myinfo.avatar,
                        name: myinfo.name,
                        nickname: myinfo.nickname,
                        sername: myinfo.sername,
                        phone: myinfo.phone,
                        date: myinfo.date,
                        pId:pid,
                    },
                    userId:userid,
                    files: storeChat.getFileValue(),
                    type: storeChat.getFileValue().name.split('.'),
                    size: storeChat.getFileValue().size,
                    chatInfo:store.getChatInfo()})
            }
            else{
                socket.emit('@sendClientChat',{
                    message: storeChat.getTextarea(),
                    myinfo:{
                        avatar: myinfo.avatar,
                        name: myinfo.name,
                        nickname: myinfo.nickname,
                        sername: myinfo.sername,
                        phone: myinfo.phone,
                        date: myinfo.date,
                        pId:pid,
                    },
                    userId:userid,
                    chatInfo:store.getChatInfo()
                    })
            }
            storeChat.setTextarea('')
            storeChat.setFileValue(null)
            input.current.value=''
         
        }
        else{
            if(storeChat.getFileValue()){
                socket.emit('@redactMessageChat',{
                    message: storeChat.getTextarea(),
                    index: store.getIndex(),
                    id: storeChat.getMgid(),
                    files: storeChat.getFileValue(),
                    type: storeChat.getFileValue().name.split('.'),
                    size: storeChat.getFileValue().size
                })
            }
            else{
                socket.emit('@redactMessageChat',{
                    message: storeChat.getTextarea(),
                    index: store.getIndex(),
                    id: storeChat.getMgid()
                })
            }
    
        }
    }
    
}