const { checkStatus } = require("../../../middlewares/checkStatus")
const { setInfo } = require("../../../socketControllers/setInfo")

function sendInfoClient(socket,io,r){
    socket.on('@sendInfoClient',(request)=>{
        checkStatus(request,io,setInfo(request,io))
    })
}
module.exports={sendInfoClient}