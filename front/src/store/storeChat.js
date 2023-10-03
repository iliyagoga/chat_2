import { makeAutoObservable } from "mobx";

class StoreChat {
    _clc=false
    _ml=false
    _textarea=''
    _text=null
    _fileValue=null
    _red=false
    _args={}
    _mm=false
    _mgid=null
    _check=false
    _ms=null
    _mf=false
    _input=null
    _b=null
    _loaded=false
    _EmitMessage=false
    constructor(){
        makeAutoObservable(this)
    }

    setClc(c){
        this._clc=c
    }
    getClc(){
        return this._clc
    }

    setMl(c){
        this._ml=c
    }
    getMl(){
        return this._ml
    }

    setTextarea(c){
        this._textarea=c
    }
    getTextarea(){
        return this._textarea
    }

    setText(c){
        this._text=c
    }
    getText(){
        return this._text
    }

    setText(c){
        this._text=c
    }
    getText(){
        return this._text
    }

    setFileValue(c){
        this._fileValue=c
    }
    getFileValue(){
        return this._fileValue
    }

    setRed(c){
        this._red=c
    }
    getRed(){
        return this._red
    }

    setArgs(c){
        this._args=c
    }
    getArgs(){
        return this._args
    }

    setMm(c){
        this._mm=c
    }
    getMm(){
        return this._mm
    }

    setMgid(c){
        this._mgid=c
    }
    getMgid(){
        return this._mgid
    }

    setCheck(c){
        this._check=c
    }
    getCheck(){
        return this._check
    }

    setMs(c){
        this._ms=c
    }
    getMs(){
        return this._ms
    }
    
    setMf(c){
        this._mf=c
    }
    getMf(){
        return this._mf
    }

    setInput(c){
        this._input=c
    }
    getInput(){
        return this._input
    }

    setB(c){
        this._b=c
    }
    getB(){
        return this._b
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
export default new StoreChat()