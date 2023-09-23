import {action, makeAutoObservable} from 'mobx'
class Store{
    _token=''
    _socket=null
    _chats=[]
    _activePerson=null
    _activeId=null
    _joinRoom=null
    _msgid=null
    _index=null
    _messages=[]
    _e=false
    _canal=false
    _chatId=null
    _chatInfo=null
    _checkSubscribe=false
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

    getMsgId(){
        return this._msgid
    }

    setMsgId(msgid){
        this._msgid=msgid
    }
    getIndex(){
        return this._index
    }

    setIndex(index){
        this._index=index
    }
    getMessages(){
        return this._messages
    }

    setMessages(m){
        this._messages=m
    }

    getE(){
        return this._e
    }

    setE(m){
        this._e=m
    }
    getCanal(){
        return this._canal
    }

    setCanal(m){
        this._canal=m
    }

    getChatId(){
        return this._chatId
    }

    setChatId(m){
        this._chatId=m
    }

    getChatInfo(){
        return this._chatInfo
    }

    setChatInfo(m){
        this._chatInfo=m
    }

    getCheckSubscribe(){
        return this._checkSubscribe
    }

    setCheckSubscribe(m){
        this._checkSubscribe=m
    }
}
export default new Store()