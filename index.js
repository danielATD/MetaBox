var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
const {validationResult} = require('express-validator/check')

const db = require('./database')
const port = 2000
const app = express()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public')
app.use(flash());
app.use(expressValidator());

   


app.listen(port,() =>
    console.info(`Listening on port ${port}`)
)

app.use(express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/routes'))
app.get("/",function(req,res){
    return res.sendFile(path.join(__dirname,"public","index.html"))
})

