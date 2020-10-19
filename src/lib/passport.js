//Dentro de este archivo definimos nuestros métodos de autenticacion

const passport = require('passport') //Passport permite usar redes sociales para loguearse
const LocalStrategy = require('passport-local').Strategy //Configuracion para crear autenticaciones con la propia bd
const pool = require('../database')
const helpers = require('../lib/helpers')


passport.use('colab.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM UsersColab WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0];
        const match = await helpers.matchPassword(password, user.password)
        if (match == true) {
            done(null, user, req.flash('alerta', 'Bienvenid@ ' + user.username))
        }
        else {
            done(null, false, req.flash('error', 'Contraseña invalida'))
        }
    }
    else {
        done(null, false, req.flash('error', 'Usuario no existe'))
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body //importamos el fullname desde request body
    const newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password)
    try {
        const result = await pool.query('INSERT INTO UsersColab SET ?', [newUser])
        newUser.id = result.insertId
        return done(null, newUser) //Devolvemos el newUser para almacenarlo en una sesion
    } catch (error) {
        return done(null, false, req.flash('error', 'Ya existe este usuario'))
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.username)

}) //cuando serielizamos, guardamos el username del usuario

passport.deserializeUser(async (username, done) => {
    const rows = await pool.query('SELECT * FROM UsersColab WHERE username = ?', [username])
    done(null, rows[0])
})