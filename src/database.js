//Este archivo tendrá la conexión a mysql

const mysql = require('mysql')
const {promisify} = require('util') //modulo para convertir callbacks a promesas o "soportar" promesas

const {database} = require('./keys.js')

const pool = mysql.createPool(database)    //createPool crea hilos que se ejecutan y hacen una tarea a la vez en secuencia (producción)
pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Se perdio la conexion con la BD')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La BD tiene muchas conexiones')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La conexion a la BD fue rechazada')
        }
    }

    if(connection) connection.release();
    console.log('Se ha establecido la conexion con la BD')
    return
}) //establecer la conexión
//OJO este módulo no soporta las promesas, se deben hacer callbacks y luego convertirlas a promesas

//Promisify Pool Querys
pool.query = promisify(pool.query)

module.exports = pool;