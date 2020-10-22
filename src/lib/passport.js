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
    const rows = await pool.query('SELECT * FROM Users WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0];
        const match = await helpers.matchPassword(password, user.Password)
        if (match == true) {
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

// passport.use('local.signup', new LocalStrategy({
//     usernameField: 'identification',
//     passwordField: 'password',
//     passReqToCallback: true
// }, async (req, done) => {
//     const temp = req.body //importamos el fullname desde request body
//     const password = await generatePassword().then()
//     const newUser = {
//         username: temp.identification,
//         password 
//     }
//     newUser.password = await helpers.encryptPassword(password)
//     console.log(password)
//     try {
//         await pool.query('INSERT INTO Users SET ?', [newUser])
//         await pool.query('INSERT INTO RolColab SET ?', [newUser.username])
//         return done(null, false, req.flash('alerta', 'Registro guardado correctamente'))
//     } catch (error) {
//         return done(null, false, req.flash('error', 'Ya existe este usuario'))
//     }
// }))

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
        rolAdmin,
        rolColab
    }
        done(null, user)
})