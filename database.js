const mysql = require('mysql');

var db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: 25060,
    database : process.env.DATABASE,
    password: process.env.PASSWORD
});

db.getConnection(function(error){
    if(!!error){
        console.log(error)
    }
    else{
        console.log('Conectado!')
    }
})


module.exports = db;