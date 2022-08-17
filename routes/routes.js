const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../database')
const {check, body} = require('express-validator/check')
const authController = require('../routes/controller')
//login page
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"..","public","login.html"),{
    title: 'Iniciar Sesión',
    email: '',
    password: ''
    }
    )

})
// register page
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname,"..","public","signup.html"),{
        errorKi : "<%=errorMessage%>"
    })
})

router.post("/register", check('email').isEmail().withMessage('Ingresa un correo válido.'),
 check('password').isLength({min: 5}).withMessage('La contraseña debe tener más de 5 caracteres.').isAlphanumeric().withMessage('La contraseña solo puede tener números y letras.'), 
 body('re_pass').custom((value, {req})=>{
    if(value!==req.body.password){
        throw new Error('Las contraseñas deben coincidir')
    }
    return true
 }),
 authController.postSignup)
 
 router.post('/login', authController.postLogin);


module.exports = router