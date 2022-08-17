const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'daniel',
    database : 'OrganizerApp',
    password: 'sasuke07'
});

db.connect(function(error){
    if(!!error){
        console.log(error)
    }
    else{
        console.log('Conectado!')
    }
})


module.exports = db;