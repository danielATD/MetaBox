const express = require('express')
const path = require("path")
const mysql = require('mysql')
const app = express()
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'html');
const db = mysql.createConnection({
    host: 'db-mysql-nyc1-33748-do-user-11776805-0.b.db.ondigitalocean.com',
    user: 'nodeapp',
    port: '25060',
    password: 'AVNS_QyBge3mz-f7-KtrN13m',
    database: 'defaultdb',
});

console.log("hola!");

/*db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})
*/
app.listen(port,() =>
    console.info(`Listening on port ${port}`)
)

app.use(express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/routes'))
app.get("/",function(req,res){
    return res.sendFile(path.join(__dirname,"public","index.html"))
})

