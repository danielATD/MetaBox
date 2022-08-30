const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.EMAIL_API);
function getMessage(emailParams, name, lastname, id) {
    return {
      to: emailParams,
      from: 'metaboxpanama@gmail.com',
      subject: 'Registro Exitoso en Metabox Panama',
      text:'Hola un placer saludarte!\n' +
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
      'Full Name: '+name+' '+lastname+' EBX'+id+'\n'+
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
    };
  }

  async function sendEmail(emailParams,name, id) {
    try {
      await sendGridMail.send(getMessage(emailParams, name, id));
      console.log('Order confirmation email sent successfully') ;
     
    } catch (error) {
      const message = `Error sending order confirmation email or orderNr:`;
      console.error(message);
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
  
  module.exports = {
    sendEmail
  }