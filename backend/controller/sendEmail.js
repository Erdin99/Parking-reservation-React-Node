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
        subject: 'Sending information about your parking reservation!',
        text: 'Thank you for your reservation! Your reservation code is: ' + code + "!"
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