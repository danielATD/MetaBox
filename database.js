const mysql = require('mysql');

var db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    database : process.env.DATABASE,
    password: process.env.PASSWORD,
    connectionLimit: 3
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