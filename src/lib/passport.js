//Dentro de este archivo definimos nuestros métodos de autenticacion

const passport = require('passport') //Passport permite usar redes sociales para loguearse
const LocalStrategy = require('passport-local').Strategy //Configuracion para crear autenticaciones con la propia bd
const pool = require('../database')
const { match } = require('../lib/helpers')


passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM Users WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0];
        const matched = await match(password, user.Password)
        if (matched) {
            done(null, user)
        }
        else {
            done(null, false, req.flash('error', 'Contraseña invalida'))
        }
    }
    else {
        done(null, false, req.flash('error', 'Usuario no existe'))
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.Username)

}) //cuando serielizamos, guardamos el username del usuario

passport.deserializeUser(async (username, done) => {
    const rows = await pool.query('SELECT * FROM Users RIGHT JOIN ProfileInfo ON Users.Username = ProfileInfo.Identification WHERE username = ?', [username])
    var rolAdmin
    var rolColab 
    var rol = await pool.query('SELECT * FROM RolAdmin WHERE Adminame = ?', [username])
    if(rol[0] != null)
    {
        rolAdmin = true;
    }
    else
    {
        rolAdmin = false;
    }
    rol = await pool.query('SELECT * FROM RolColab WHERE Colabname = ?', [username])
    if(rol[0] != null)
    {
        rolColab = true;
    }
    else
    {
        rolColab = false;
    }

    const user = {
        Username: rows[0].Identification,
        Name: rows[0].Name,
        Identification: rows[0].Identification,
        Phone: rows[0].Phone,
        Email: rows[0].Email,
        BirthDate: rows[0].BirthDate,
        Province: rows[0].Province,
        Canton: rows[0].Canton,
        District: rows[0].District,
        rolAdmin,
        rolColab
    }
        done(null, user)
})