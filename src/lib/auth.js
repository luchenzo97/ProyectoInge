module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) //si la sesion existe (usuario logeado)
        {
            return next() //continúe con el resto del código que le sigue a la funcion
        }
        return res.redirect('/login')
    }, //este metodo se ejecutará en las rutas de express por ello el req, res y next pues se procesarán los datos en cada ruta
    //metodo para proteger las vistas segun esté loggeado el usuario o no

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/profile')
    },

    isColab(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.IsColab) {
                return next()
            }
            return res.redirect('/profile')
        }
        return res.redirect('/login')

    }
}