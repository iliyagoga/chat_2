function checkType(file){
    const type=file.name.split('.')[1]
    if(type=='jpg' || type=='png')
    return true
    return false
}
module.exports=checkType