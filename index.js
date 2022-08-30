var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
const {validationResult} = require('express-validator/check')

const db = require('./database')
const port = 8080
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public')
app.use(expressValidator());

   


app.listen(process.env.PORT,() =>
    console.info(`Listening on port ${port}`)
)

app.use(express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/routes'))
app.get("/",function(req,res){
    return res.render('index.ejs')
})

