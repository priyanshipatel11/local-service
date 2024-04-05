const mailer = require('nodemailer');

const mailSend = async(to,subject,text)=>{
    const mailOptions = {
        from: '20ce43krupa@gmail.com',
        to: to,
        subject: subject,
     //   text: text
        html: "<h1>Welcome...</h1><p>Thank you for joining us</p>"
    }

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: '20ce43krupa@gmail.com',
            pass: 'fwdpsusdkwxhxaqh'
        }
    })
        

    const res = await transporter.sendMail(mailOptions)
    
    return res

}
//mailSend("20ce43krupa@gmail.com","Test","welcome to app...")
module.exports = {
    mailSend
}
