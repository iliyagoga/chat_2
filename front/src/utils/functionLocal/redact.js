import storeLocal from "../../store/storeLocal"

export async function redact(){
    if(storeLocal.getClc()){
        storeLocal.setRed(true)
        storeLocal.setTextarea(storeLocal.getText())
    }
}