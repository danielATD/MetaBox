var mysql = require('mysql');
const dotenv = require("dotenv").config()

const db = mysql.createConnection({
    host: 'db-mysql-nyc1-33748-do-user-11776805-0.b.db.ondigitalocean.com',
    user: 'nodeapp',
    port: '25060',
    password: 'AVNS_QyBge3mz-f7-KtrN13m',
    database: 'defaultdb',
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})