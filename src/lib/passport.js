//Dentro de este archivo definimos nuestros métodos de autenticacion

const passport = require('passport') //Passport permite usar redes sociales para loguearse
const LocalStrategy = require('passport-local').Strategy //Configuracion para crear autenticaciones con la propia bd
const pool = require('../database')
const helpers = require('../lib/helpers')


passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  //en este caso podriamos no ponerlo ya que no estamos guardando nada, pero por si se ocupara en un futuro, se pone
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM UsersMentes WHERE username = ?', [username])
    if(rows.length > 0)
    {
        const user = rows[0];
        const match = await helpers.matchPassword(password, user.password)
        if(match == true)
        {
            done(null,user, req.flash('alerta','Bienvenid@ ' + user.username))
        }
        else
        {
            done(null, false, req.flash('error','Contraseña invalida'))
        }
    }
    else
    {
        done(null, false, req.flash('error','Usuario no existe'))
    }
}))

passport.use('colab.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  //en este caso podriamos no ponerlo ya que no estamos guardando nada, pero por si se ocupara en un futuro, se pone
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM UsersColab WHERE username = ?', [username])
    if(rows.length > 0)
    {
        const user = rows[0];
        const match = await helpers.matchPassword(password, user.password)
        if(match == true)
        {
            done(null,user, req.flash('alerta','Bienvenid@ ' + user.username))
        }
        else
        {
            done(null, false, req.flash('error','Contraseña invalida'))
        }
    }
    else
    {
        done(null, false, req.flash('error','Usuario no existe'))
    }
}))

// passport.use('user.creation', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, async (req, username, password, done) => {
//     const {NewUser, password} = req.body

// }))


passport.serializeUser((user, done) => {
    done(null, user.username)

}) //cuando serielizamos, guardamos el username del usuario

passport.deserializeUser( async (username, done) =>{
    const rows = await pool.query('SELECT * FROM UsersMentes WHERE username = ?', [username])
    done(null, rows[0]) //estas consultas retornan un arreglo con el objeto, por ello el rows[0] para acceder al obj directamente
}) //cuando deserializamos, tomamos ese id que se guardó para obtener los datos desde la BD


passport.deserializeUser( async (username, done) =>{
    const rows = await pool.query('SELECT * FROM UsersColab WHERE username = ?', [username])
    done(null, rows[0])
})