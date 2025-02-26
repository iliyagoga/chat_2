import store from "../../store/store"

export async function setVision(value,chatid,check){
    const socket=store.getSocket()
    try {
        socket.emit('@setVision',{value,chatid,check})
    } catch (error) {
        console.log(error)
    }
}