import storeChat from "../../store/storeChat"

export   async function redact(){
    if(storeChat.getClc()){
        storeChat.setRed(true)
        storeChat.setTextarea(storeChat.getText())
    }
}