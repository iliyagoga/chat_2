const express=require('express')
require('dotenv').config()
const sequelize=require('./dbConfiguration')
const cors=require('cors')
const models = require('./models/model')
const filesUpload = require('express-fileupload')
const path= require('path')
const router = require('./router')
const app=express()
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use('/',router)
async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(5000,()=>{console.log('Сервер запущен')})
        
    } catch (error) {
        console.log(error)
    }
}
start()