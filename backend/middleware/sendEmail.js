const nodeMailer = require("nodemailer")


exports.sendEmail = async (options) =>{
//     const transporter = nodeMailer.createTransport({
//  host : process.env.SMPT_HOST,
//  port : process.env.SMPT_PORT,
//  auth : {
//     user :process.env.SMPT_MAIL,
//     pass :process.env.SMPT_PASSWORD
//  },
//  service:process.env.SMPT_SERVISE

//  })
var transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b2065f9cf1353b",
      pass: "6e0b88654f80e8"
    }
  });

 
const mailOption ={
    from:"b2065f9cf1353b",
    to: options.email,
    subject: options.subject,
    text: options.message
}


await transporter.sendMail(mailOption)
}