const express = require('express');
const path = require("path")
const app = express()
const port = 3000

app.listen(port,() =>
    console.info(`Listening on port ${port}`)
)

app.use(express.static(path.join(__dirname,'public')))

app.use('/', require('./routes/routes'))
app.get("/",function(req,res){
    return res.sendFile(path.join(__dirname,"public","index.html"))
})

