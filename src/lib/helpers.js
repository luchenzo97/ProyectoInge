//Helpers que se encargarán de procesar determinados datos (puede ser lo del mapa etc)

const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
//const { request } = require('express')

const Mailer = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ingsistemasuna2020@gmail.com',
        pass: 'kirbmaryloredavid'
    }
})

const helpers = {}

helpers.encryptData = async (data) => {
    const salt = await bcrypt.genSalt(10) //algoritmo para generar un hash, se define la cantidad de veces que se ejecuta en N
    const hash = await bcrypt.hash(data, salt) //cifra en password con salt
    return hash
}

helpers.match = async (data, savedData) => {
    try{
        return await bcrypt.compare(data, savedData)
    }catch(e){
        console.log(e)
    }
}

helpers.generateKey =  async (lenght) => {
    try {

        const chars = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        var password = ''
        for (i = 0; i < lenght; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return password

    } catch (e) { console.log(e) }
}

helpers.sendEmail = async (username, email, password) => {
    await Mailer.sendMail({
        from: '"Proyecto Ingeniería" <Mailer.host>', // sender address
        to: email, // list of receivers
        subject: "Solicitud Aprobada", // Subject line
        text: "Su solicitud ha sido aprobada. Sus credenciales son: Usuario-> " + username + " Contraseña-> " + password  // plain text body
        /*html: '<div class="container text-center my-auto">' +
        '<p> Correo de prueba <p>' +
        '<button href='+ enlace +'class="btn btn-success btn-block">Enlace</button>'+
        '</div>' // html body*/
    })
} 

helpers.sendRecoveryEmail = async (email, link) => {
    await Mailer.sendMail({
        from: '"Proyecto Ingeniería" <Mailer.host>', // sender address
        to: email, // list of receivers
        subject: "Cambio de Contraseña", // Subject line
        text: "Ingrese al siguiente link para cambiar su contraseña: " + link  // plain text body
        /*html: '<div class="container text-center my-auto">' +
        '<p> Correo de prueba <p>' +
        '<button href='+ enlace +'class="btn btn-success btn-block">Enlace</button>'+
        '</div>' // html body*/
    })
} 


module.exports = helpers