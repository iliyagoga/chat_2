const { Chats } = require("../../../models/model")

async function ttt(r,io){
    
    const {chatid,value,check}=r

    try {  
        if(check=='admin'){
            const r1=await Chats.update({vision:value},{where:{id:chatid}})
            io.emit('@getVision',{vision: value})
        }
        else{
            io.emit('@getVision',{vision :new Error(false)})
        }
       
    } catch (error) {
        io.emit('@getVision',{vision :new Error(false)})
    }
}
function getVision(socket,io){
    socket.on('@setVision',(r)=>{
        ttt(r,io)
        
    })
}
module.exports={getVision}