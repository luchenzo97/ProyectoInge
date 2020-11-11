//Este archivo contendrá parablas claves para iniciar servicios

module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: 'toor',
        database: 'ATLAS_EN_ACCION',
        insecureAuth: true,
        pool: {
            max: 200, //máximo numero de conexiones en pool
            min: 0, //minimo de conexiones
            idle:10000, //Tiempo máximo en ms en la que una conexión puede estar idle antes de ser liberada
            acquire: 30000 //Tiempo máximo en ms, en el que el pool intentará a reconectarse luego de lanzar un error
        }
    }
}