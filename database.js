const mysql = require('mysql');

var db = mysql.createConnection({
    host: "db-mysql-nyc1-52436-do-user-11776805-0.b.db.ondigitalocean.com",
    user: "doadmin",
    port: 25060,
    database : "Users",
    password: "AVNS_c9FKi5spe2Ys0PLOGLT"
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