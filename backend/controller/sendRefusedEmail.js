import nodemailer from 'nodemailer'

const sendRefusedEmail = (email, parking_name) => {
      var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Infromacija vezana za rezervisanje parking prostora!',
        text: 'Vaša rezervacija parking prostora: ' +  parking_name + ' je odgodjena. Sa prijašnjim kodom nemate mogućnost ulaska!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export default sendRefusedEmail