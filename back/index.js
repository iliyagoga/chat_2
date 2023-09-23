const express=require('express')
require('dotenv').config()
const sequelize=require('./dbConfiguration')
const uuid=require('uuid')
const cors=require('cors')
const models = require('./models/model')
const filesUpload = require('express-fileupload')
const path= require('path')
const router = require('./router')
const fs=require('fs')
const { writeFile } = require("fs/promises");
const { createMessageLocal } = require('./utils/createMessage')
const { deleteMessage } = require('./utils/deleteMessage')
const { redactMessage } = require('./utils/redactMessage')
const { createFile } = require('./utils/createFile')
const { setSubscribe, denySubscribe, getInfoChat } = require('./utils/chat')
const app=express()
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(filesUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/',router)
const hoomeRoom=uuid.v4()
//process.env.DEBUG="*"
let io
function onConnection(socket){
    socket.heartbeatTimeout =20
    socket.on('@createMLRoom',(req)=>{
        socket.join('@home'+req.message)
    })
    socket.on('@connect',(req)=>{
        socket.on('disconnect',(r)=>{
            io.emit("@disconnected-server",{req})
        })
    })
    
    
    socket.on('@joinRoom',(r)=>{
        socket.join(r.message.room)
        io.in(r.message.room).emit('@status',{message:r.message.myid})
        socket.on('@statusSet',(req)=>{
            io.in(r.message.room).emit('@statusSetServer')})  
        socket.on('@deleteMessage',(r)=>{
            deleteMessage(r.msgid,io,r.room,r.index)
    })
        socket.on('@redactMessage',(req)=>{
            redactMessage(req.id,io,r.message.room,req.index,req.message,req.files,req.type,req.size)
    })  
        socket.on('@clientSubscribe',(req)=>{
            console.log(req)
            subscribe(req.chatid.req.userid,io,r.message.room)
        })
        socket.on('@sendClient',(req)=>{
            const messID=uuid.v4()
            let title=null
            createMessageLocal({message:req.message,recipient:req.recipient,LocalId:r.message.room,sender:req.id,msgid:messID})
            if(req.files){
                title=uuid.v4()+'.'+req.type[req.type.length-1]
                fs.writeFileSync(__dirname+'/static/'+title,req.files)
                const re=createFile(title,messID,req.size)
                if(!re){
                    title=null
                }
            }
            io.in(r.message.room).emit('@sendServer',{message:req.message,id:req.id,LocalId:r.message.room,msgid:messID,file:title})
            io.in('@home'+r.message.personId).emit('@sendServer2',{
                message:req.message,
                chatId:r.message.chatId,
                nickname:r.message.nickname,
                avatar:r.message.myavatar,
                id:req.id,
                room: r.message.room})
        })
        socket.on('@onaction',(req)=>{
            io.in(r.message.room).emit('@setAction',{id:req.id})
        })
        socket.on('@offaction',(req)=>{
            io.in(r.message.room).emit('@deleteAction',{id:req.id})
        })
    })

    socket.on('@joinChat',(r)=>{
        socket.join(r.chatid)
        socket.emit('@joinChatOk')
        socket.on('@clientSetSubscribe',(req)=>{
            setSubscribe(req.chatid,req.userid,io)
        })
        socket.on('@clientDenySubscribe',(req)=>{
            denySubscribe(req.chatid,req.userid,io)
        })
        socket.on('@clientGetInfoChat',(req)=>{
            getInfoChat(req.chatid,io)
        })
      
    })
}
async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.timeout = 20000
        let server=app.listen(5000,()=>{console.log('Сервер запущен')})
        io=require('socket.io')(server,{
            cors: {
              origin: '*'
            }
          })
        io.on('connection',onConnection)
    } catch (error) {
        console.log(error)
    }
}
start()