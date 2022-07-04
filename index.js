const express = require('express')
const path = require("path")
const mysql = require('mysql')
const app = express()
const cookieParser = require("cookie-parser")
const database = require('./db_connect')
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'html');

console.log("hola!");


app.listen(port,() =>
    console.info(`Listening on port ${port}`)
)

app.use(express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/routes'))
app.get("/",function(req,res){
    return res.sendFile(path.join(__dirname,"public","index.html"))
})

