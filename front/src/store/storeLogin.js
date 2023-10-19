import { makeAutoObservable } from "mobx"

class StoreLogin{
    _log=''
    _pass=''
    _pass2=''
    _err=false
    _u=false
    _text=''
    constructor(){
        makeAutoObservable(this)
    }

    setLog(l){
        this._log=l
    }
    getLog(){
        return this._log
    }

    setPass(l){
        this._pass=l
    }
    getPass(){
        return this._pass
    }

    setPass2(l){
        this._pass2=l
    }
    getPass2(){
        return this._pass2
    }

    setErr(l){
        this._err=l
    }
    getErr(){
        return this._err
    }

    setU(l){
        this._u=l
    }
    getU(){
        return this._u
    }

    setText(l){
        this._text=l
    }
    getText(){
        return this._text
    }
} 
export default new StoreLogin()