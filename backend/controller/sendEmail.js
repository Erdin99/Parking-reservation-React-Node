import nodemailer from 'nodemailer'

const sendEmail = (email, code) => {
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
        text: 'Hvala na korištenju naše aplikacije za rezervaciju parking prostora! Vaš kod za rezervaciju je: ' + code + "!" + " Molimo Vas da vaš kod čuvate, jer je neophodan za potvrdu rezervacije."
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export default sendEmail