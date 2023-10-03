import storeChat from "../../store/storeChat"

export  function memberModal(args){
    const {avatar,name,sername,nickname,date,phone}=args
    storeChat.setArgs({avatar,name,sername,nickname,date,phone})
    storeChat.setMm(true)
    
}