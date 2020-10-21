//Helpers que se encargarán de procesar determinados datos (puede ser lo del mapa etc)

const bcrypt = require('bcryptjs')
const { request } = require('express')
const helpers = {}

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) //algoritmo para generar un hash, se define la cantidad de veces que se ejecuta en N
    const hash = await bcrypt.hash(password, salt) //cifra en password con salt
    return hash
}

helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword)
    }catch(e){
        console.log(e)
    }
}

helpers.generatePassword =  async () => {
    try {

        const chars = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        var password = ''
        for (i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return password

    } catch (e) { console.log(e) }
}

module.exports = helpers