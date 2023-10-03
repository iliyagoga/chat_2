const express=require('express')
require('dotenv').config()
const sequelize=require('./dbConfiguration')
const cors=require('cors')
const models = require('./models/model')
const filesUpload = require('express-fileupload')
const path= require('path')
const router = require('./router')
const e = require('express')
const { onConnection } = require('./socketcore/mean')
const app=express()
app.use(express.json())
app.use(cors());
app.use(filesUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/',router)

//process.env.DEBUG="*"
let io

async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.timeout = 20000
        let server=app.listen(5000,process.env.HOST,()=>{console.log('Сервер запущен')})
        io=require('socket.io')(server,{
            cors: {
              origin: '*'
            }
          })
        io.on('connection',(socket)=>onConnection(socket,io))
    } catch (error) {
        console.log(error)
    }
}
start()