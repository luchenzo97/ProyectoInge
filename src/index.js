//Este archivo inicializa el app

const express = require('express') //acá requerimos al módulo express y lo guardamos en una variable
const morgan = require('morgan') // lo mismo para lo demás
const handlebars = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash') //esto es un middlewar
const session = require('express-session') //Modulo de sesion requerido por flash()
const myslqSession = require('express-mysql-session') // Modulo para guardar la sesion en la BD
const passport = require('passport')

const {database} = require('./keys') //requerimos la propiedad database de la ruta establecida, funciona con metodos tambien



/*******************************************************************************/
//inicializaciones

const app = express() //llamada a express que devuelve un obj, se almacena en app
require('./lib/passport') //Le decimos a la app donde se esta configurando la autenticacion con passport

/*******************************************************************************/
//configuraciones

app.set('port', process.env.PORT || 9000) //seteamos el app en 'port' el puerto del sistema, caso contrario en el 9000
app.set('views', path.join(__dirname,'views')) //seteamos la ruta de la carpeta views

app.engine('.hbs', handlebars({
    defaultLayout: 'main',  //configuramos el layout por defecto
    layoutsDir: path.join(app.get('views'), 'layouts'), //concatenamos rutas para guardar la ruta de layouts
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //definimos la extensión de los archivos
    helpers: require('./lib/handlebars.js')
})) //configuramos un engine llamado .hbs, llamamos a modulo handlebars y le ingresamos un obj a configurar, todo esto con respecto a handlebars

app.set('view engine', '.hbs')


/*******************************************************************************/
//Middlewares
app.use(session({
    secret: 'sesion',
    resave: false,
    saveUninitialized: false,
    store: new myslqSession(database)
})) //Configuración del session requerido por flash()

app.use(flash())
app.use(morgan('dev')) //le decimos al app que ejecute el modulo morgan, parametro con strig dev para mostrar mensajes por consola
app.use(express.urlencoded({extended: false})) //urlencoded acepta desde los formularios que envían los usuarios
app.use(express.json());

app.use(passport.initialize())
app.use(passport.session())

/*******************************************************************************/
//Variables globales
app.use((req,res,next) => {
    app.locals.alerta = req.flash('alerta') //Hacemos disponible el mensaje llamado Success en todas las vistas
    app.locals.error = req.flash('error')
    app.locals.user = req.user //almacenamos el datos de sesion del usuario para que pueda ser utilizado por todas las vistas
    
    next()
})

/*******************************************************************************/
//Rutas

app.use(require('./routes/index.js')) //le decimos al app que ejecute lo que se requiere, en este caso, lo que está en la ruta
app.use(require('./routes/authentication.js'))
app.use('/registry', require('./routes/registry.js')) //El /registry de primero indica que todas las rutas dentro de links.js le predecerán el /registry a la hora de los POST y GET

/*******************************************************************************/
//Archivos publicos

app.use(express.static(path.join(__dirname, 'public')))


/*******************************************************************************/
//Inicializar server

app.listen(app.get('port'), () => {
    console.log("Server en el puerto", "localhost:"+app.get('port'))
}) //Hacemos que escuche en el puerto configurado e imprimimos por consola el mismo