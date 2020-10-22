//rutas de autenticación

const express = require('express')
const router = express.Router()
const passport = require('passport')
const logged = require('../lib/auth')


router.get('/login', logged.isNotLoggedIn, (req, res) => {
    res.render('auth/login')
})

router.post('/login', logged.isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next) //Pasamos los objetos request, response y next (este ultimo por ser un middlewar)
})

router.get('/loginColab', logged.isNotLoggedIn, (req, res) => {
    res.render('auth/loginColab')
})

router.post('/loginColab', logged.isNotLoggedIn, (req, res, next) => {
    passport.authenticate('colab.login', {
        successRedirect: '/profile',
        failureRedirect: '/loginColab',
        failureFlash: true
    })(req, res, next) //Pasamos los objetos request, response y next (este ultimo por ser un middlewar)
})

router.get('/profile', logged.isLoggedIn, (req, res) => {
    res.render('profile')
})

router.get('/logout', logged.isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('./')
})


module.exports = router