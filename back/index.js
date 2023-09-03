const express=require('express')
require('dotenv').config()
const sequelize=require('./dbConfiguration')
const uuid=require('uuid')
const cors=require('cors')
const models = require('./models/model')
const filesUpload = require('express-fileupload')
const path= require('path')
const router = require('./router')
const app=express()
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(filesUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/',router)
const hoomeRoom=uuid.v4()
let io
function onConnection(socket){
    socket.on('@createMLRoom',(req)=>{
        socket.join('@home'+req.message)
    })
    socket.on('@joinRoom',(r)=>{
        socket.join(r.message.room)
        socket.on('@sendClient',(req)=>{
            io.in(r.message.room).emit('@sendServer',{message:req.message,id:req.id})
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