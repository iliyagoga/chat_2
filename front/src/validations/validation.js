export const validation=(data)=>{
    if(data.search(/[а-яА-ЯЁё]+/)!==-1){
        return true
    }
    else{
        return false
    }
}