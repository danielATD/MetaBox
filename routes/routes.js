const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../database')
const {check, body} = require('express-validator/check')
const authController = require('../routes/controller')

//login page
router.get("/login", (req, res) => {
    res.render(('login.ejs'),{
    title: 'Iniciar Sesión',
    email: '',
    password: '',
    errorMessage: false
    }
    )

})
// register page
router.get('/register', (req, res) => {
    res.render('register.ejs',{
        errorMessage : false
    })
})

router.post("/register", check('name').not().isEmpty().withMessage('Debes ingresar un nombre.'),check('lastname').not().isEmpty().withMessage('Debes ingresar un apellido.'),check('email').isEmail().withMessage('Ingresa un correo válido.'),
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