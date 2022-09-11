const mysql = require('mysql');

var db = mysql.createPool(process.env.JAWSDB_URL);

db.getConnection(function(error){
    if(!!error){
        console.log(error)
    }
    else{
        console.log('Conectado!')
    }
})

module.exports = db;