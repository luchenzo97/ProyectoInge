const nodemailer = require('nodemailer')
const EmailTemplate = require('email-templates')
const path = require('path')

const Mailing = {}

const Mailer = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ingsistemasuna2020@gmail.com',
        pass: 'kirbmaryloredavid'
    }
})


Mailer.use('compile', hbs({
    viewPath: './views/mailing',
    extName: '.hbs'
}))

Mailing.sendApplicantApprovation = async (obj) => {

   return await Mailer.sendMail(obj, (err) =>{
        if(err){
            console.log(err)
        }
    })
}

Mailing.loadTemplate = function(templateName, context)
{
    let template = new EmailTemplate('./views/mailing/' + templateName)
    return
}

module.exports = Mailing