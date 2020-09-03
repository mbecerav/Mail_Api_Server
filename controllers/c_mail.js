var nodemailer = require('nodemailer'); 
 
exports.sendEmail = function(req, res){

  const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'vanessa.schaefer@ethereal.email',
          pass: '9tgKCKshpdVqPcRxpe'
      }
  });

  var mailOptions = {
         from: 'do_not_reply@northpole.com',
         to: 'vanessa.schaefer@ethereal.email',
         subject: 'New letter for Santa ! !',
         text: 'From: ' + req.body.cName + ' \n ' +
               'Address: ' + req.body.cAdress + ' \n ' +
               'Wish: ' + req.body.cWish + ' '
        //text: 'Hola desde mi device'
  };

  transporter.sendMail(mailOptions, function(err, info){
      if (err){
          console.log(err);
          res.send(500, err.message);
      } else {
          console.log("Email sent");
          res.status(200).jsonp(req.body);
      }
  });   
};