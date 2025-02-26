const { setMoot } = require("../../../socketControllers/setMoot")

function setMootClient(socket,io,r){
    socket.on('@setMootClient',(r)=>{
        setMoot(r,io)
    })
}
module.exports={setMootClient}