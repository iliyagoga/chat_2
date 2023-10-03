const { makeAutoObservable } = require("mobx");

class StoreLocal{
    _mgid=null
    _clc=false
    _textarea=''
    _action=false
    _red=false
    _text=null
    _fileValue=null
    _loaded=false
    _EmitMessage=false
    constructor(){
        makeAutoObservable(this)
    }

    setMgid(m){
        this._mgid=m
    }
    getMgid(){
        return this._mgid
    }

    setClc(m){
        this._clc=m
    }
    getClc(){
        return this._clc
    }

    setTextarea(m){
        this._textarea=m
    }
    getTextarea(){
        return this._textarea
    }

    setAction(m){
        this._action=m
    }
    getAction(){
        return this._action
    }

    setRed(m){
        this._red=m
    }
    getRed(){
        return this._red
    }

    setText(m){
        this._text=m
    }
    getText(){
        return this._text
    }

    setFileValue(m){
        this._fileValue=m
    }
    getFileValue(){
        return this._fileValue
    }

    setLoaded(m){
        this._loaded=m
    }
    getLoaded(){
        return this._loaded
    }

    setEmitMessage(m){
        this._EmitMessage=m
    }
    getEmitMessage(){
        return this._EmitMessage
    }
}
export default new StoreLocal()