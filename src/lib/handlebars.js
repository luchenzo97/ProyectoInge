//En este archivo definimos las funciones a utilizar con handlebars


//Configuración e instanciación del modulo timeago.js para poder utilizarlo
const {format} = require('timeago.js')
const helpers = {} //este obj es el que será utilizado por la vista handlebars, es decir, todos los archivos .hbs
helpers.timeago = (timestamp) => {
    return format(timestamp);
}

module.exports=helpers