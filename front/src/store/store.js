import {makeAutoObservable} from 'mobx'
class Store{
    _token=''
    constructor(){
        makeAutoObservable(this)
    }
    getToken(){
        return this._token
    }
    setToken(token){
        this._token=token
    }
}
export default new Store()