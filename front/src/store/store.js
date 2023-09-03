import {action, makeAutoObservable} from 'mobx'
class Store{
    _token=''
    _socket=null
    _chats=[]
    _activePerson=null
    _activeId=null
    _joinRoom=null
    constructor(){
        makeAutoObservable(this)
    }
    getToken(){
        return this._token
    }

    setToken(token){
        this._token=token
    }

    getSocket(){
        return this._socket
    }

    setSocket(socket){
        this._socket=socket
    }

    getChats(){
        return this._chats
    }

    setChats(chats){
        this._chats=chats
    }

    getAPerson(){
        return this._activePerson
    }

    setAPerson(activeperson){
        this._activePerson=activeperson
    }
    getAId(){
        return this._activeId
    }

    setAId(activeid){
        this._activeId=activeid
    }
    getJoinRoom(){
        return this._joinRoom
    }

    setJoinRoom(room){
        this._joinRoom=room
    }
}
export default new Store()