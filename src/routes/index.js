//index de todas las rutas principales

const express = require('express')
const router = express.Router() //guardamos el obj express.router() en router

router.get('/', (req, res) => {
    res.render('index')
}) // Establecemos una ruta con una salida predeterminada
module.exports = router //exportamos el router