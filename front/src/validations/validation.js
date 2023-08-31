export const validation=(data)=>{
    if(data.search(/[а-яА-ЯЁё]+/)!==-1){
        return true
    }
    else{
        return false
    }
}
export const checkEmpry=(text)=>{
    if(text.length==0){
        return false
    }
    return true
}