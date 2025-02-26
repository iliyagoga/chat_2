const { Files } = require("../models/model")

async function createFile(title,id,size){
    try {
        if(size/1024/1024<2){
            const result=Files.create({file:title, MessageId:id, type: size})
            return true
        }

    } catch (error) {
        return false
    }
}
module.exports={createFile}