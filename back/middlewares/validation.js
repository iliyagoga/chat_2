module.exports = function validation(req,res,next){
    const {password}=req.body
    if(password.length<=7){
        return res.status(404).json('Пароль должен быть больше 7 символов')
    }
    if(password.search(/[\d]+/)===-1){
        return res.status(404).json('В пароле должны присутствовать цифры')
    }
    if(password.search(/[A_Za-z]+/)===-1){
        return res.status(404).json('В пароле должна присутствовать латиница')
    }
    if(password.search(/[а-яА-ЯЁё]+/)!==-1){
        return res.status(404).json('В пароле не должно быть киррилицы')
    }
    if(password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)===-1){
        return res.status(404).json('В пароле должны присутствовать спецсимволы')
    }
    if(password.search(/[\s]+/)!==-1){
        return res.status(404).json('В пароле не должно присутствовать пробела')
    }
    next()
}