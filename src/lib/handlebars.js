//En este archivo definimos las funciones a utilizar con handlebars


//Configuración e instanciación del modulo timeago.js para poder utilizarlo
const {format} = require('timeago.js')
const handlebars = require('express-handlebars')
// const helpers = {} //este obj es el que será utilizado por la vista handlebars, es decir, todos los archivos .hbs
// helpers.timeago = (timestamp) => {
//     return format(timestamp);
// }

// helpers.equals = (arg1, arg2, options) => {
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// }


//Registro de funciones custom Handlebars

var helpers = handlebars.create({});

helpers.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    console.log(arg1)
    console.group(arg2)
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

module.exports=helpers