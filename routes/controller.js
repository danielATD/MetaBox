
var express=require("express");
const validationResult = require('express-validator/check').validationResult;
const db = require("../database")
var session = require('express-session');
const nodemailer = require('nodemailer');
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key : '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'
  }
}))
 
exports.postLogin=function(req,res){
  const email = req.body.your_name
  const password = req.body.your_pass

  db.query("SELECT * FROM users WHERE email = ?", email, function(err, result){
    console.log(result)
    if (result.length == 0){
      return res.status(422).render('login.html',{
        path: '/login',
        pageTitle: 'Login',
        errorMessage: "El usuario no existe."
    })
    }
    else{
      if(password==result[0].password){
        return res.status(422).render('dashboard.html',{
          path: '/dashboard',
          pageTitle: 'dashboard',
          name: result[0].name,
          id: result[0].id
      })
      }
      else{
        return res.status(422).render('login.html',{
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
        const email = req.body.email
        const password = req.body.password
        const errors = validationResult(req)
        var errorMessage = 'error'
    
    if (!errors.isEmpty()){
      return res.status(422).render('signup.html',{
        path: '/register',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg
      });

    }
    db.query("SELECT name FROM users WHERE email = ? ",email,function (err, result){ 
      if (result.length > 0){
        return res.status(422).render('signup.html',{
          path: '/register',
          pageTitle: 'Signup',
          errorMessage: "El correo ya existe."
        });
      }
      else{ 
        db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',[name, email, password], function (error, results, fields) {
          //connection.release()
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
          }else{
            db.query('SELECT * FROM users WHERE email = ?',email,function(error, results, fields){
              transporter.send_email({
              to: email,
              from: 'metaboxpanama@gmail.com',
              subject: 'Registro en Metabox Exitoso.',
              text :'Hola un placer saludarte!\n' +
              '\n'+
              'El Equipo de Metabox Panama a creado una cuenta de P.O. Box para usted para que pueda traer todas sus compras a Panamá desde cualquier parte del Mundo.\n'+
              '\n'+
              'El tiempo estimado de entrega de Miami a Panamá es de 3 a 5 Días. Sin importar el valor de su mercancía nosotros solo le cobraremos por libra.\n'+
              '\n'+
              'Nuestro servicio de entrega a domicilio cubre toda el área metropolitana.\n'+
              '\n'+
              'A continuación detallamos como debe poner el código en sus cuentas:\n'+
              '\n'+
              'Shipping Address:\n'+
              '\n'+
              'Full Name: '+name+ 'EBX'+results[0].id+'\n'+
              '\n'+
              'Address Line 1: 8377 NW 68th St\n'+
              '\n'+
              'Address Line 2: Ste B, METABOX1\n'+
              '\n'+
              'City: MIAMI\n'+
              '\n'+
              'State: FLORIDA\n'+
              '\n'+
              'ZIP CODE: 33166-2663\n'+
              '\n'+
              'TEL: (305) 6039129\n'+
              '\n'+
              '\n'+
              '\n'+
              'Precio Flete Aéreo:\n'+
              '\n'+
              'De 1 a 11 lbs la tarifa es $ 2.50\n'+
              '\n'+
              'De 11 lbs en adelante la tarifa es de $2.45\n'+
              '\n'+
              'Se cobrará lo que sea Mayor, peso o volumen.\n'+
              '\n'+
              'Tenemos el servicio Marítimo que sera con un valor mínimo de 50 Dolares.\n'+
              '\n'+
              'Cualquier consulta estamos disponibles de:\n'+
              'Lunes a Viernes de 8:00 am a 5:00 pm.\n'+
              'Sábados de 8:00 am a 1:00 pm.\n'+
              '\n'+
              'Nuestro correo: Metaboxpanama@gmail.com\n'+
              '\n'+
              'Gracias por confiar en nosotros. No olvide seguirnos en nuestras redes sociales para nuestras promociones.\n'+
              '\n'+
              'Instagram: @Metaboxpanama\n'+
              '\n'+
              'Facebook: Metabox Panamá\n'+
              '\n'+
              'WhatsApp: 6924-2817\n'+
              '\n'+
              'Muchas gracias, estamos para servirle.\n'+
              'Saludos cordiales\n'+
              '\n'+
              'Metabox Panamá.'
            })
            return res.status(422).render('dashboard.html',{
              path: '/dashboard',
              name: results[0].name,
              id: results[0].id,

            }
            
            )
          })
          }
        });
      }
  })
}
