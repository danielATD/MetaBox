
var express=require("express");
const validationResult = require('express-validator/check').validationResult;
const db = require("../database")
var session = require('express-session');
const emailSender = require("../email-controller")
 
exports.postLogin=function(req,res){
  const email = req.body.your_name
  const password = req.body.your_pass

  db.query("SELECT * FROM users WHERE email = ?", email, function(err, result){
    console.log(result)
    if (result.length == 0){
      return res.status(422).render('login.ejs',{
        path: '/login',
        pageTitle: 'Login',
        errorMessage: "El usuario no existe."
    })
    }
    else{
      if(password==result[0].password){
        return res.status(422).render('dashboard.ejs',{
          path: '/dashboard',
          pageTitle: 'dashboard',
          name: result[0].name,
          lastname: result[0].lastname,
          id: result[0].id
      })
      }
      else{
        return res.status(422).render('login.ejs',{
          path: '/login',
          pageTitle: 'Login',
          errorMessage: "Las contraseñas no coinciden."
      })
      }
    }
  })
}

exports.postSignup=function(req,res){

        const name = req.body.name
        const lastname = req.body.lastname
        const email = req.body.email
        const password = req.body.password
        const errors = validationResult(req)
    
    if (!errors.isEmpty()){
      return res.status(422).render('register.ejs',{
        path: '/register',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg
      });

    }
    db.query("SELECT name FROM users WHERE email = ? ",email,function (err, result){ 
      if (result.length > 0){
        return res.status(422).render('register.ejs',{
          path: '/register',
          pageTitle: 'Signup',
          errorMessage: "El correo ya existe."
        });
      }
      else{ 
        db.query('INSERT INTO users (name, lastname, email, password) VALUES (?,?,?,?)',[name, lastname, email, password], function (error, results, fields) {
          //connection.release()
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
          }else{
            db.query('SELECT * FROM users WHERE email = ?',email,function(error, results, fields){
              try {
                emailSender.sendEmail(results[0].email, results[0].name, results[0].lastname, results[0].id);
                
              } catch (err) {
                console.log(err);
              }
              return res.status(422).render('dashboard.ejs',{
                path: '/dashboard',
                name: name,
                lastname: lastname,
                id: results[0].id
        
              }
              
              )

          })
          
          }
        });
      }
  })
}
