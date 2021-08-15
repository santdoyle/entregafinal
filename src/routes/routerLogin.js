const routerLogin = require('express').Router()
const passport = require('passport')
const flash = require('connect-flash')
const controllerLogin = require('../controllers/controllerLogin')

const Login = new controllerLogin()

routerLogin.get('/login', (request, response) => {
    const error = request.flash('error')
    const success = request.flash('success')
    
    response.render('login', {
        error,
        success
    })
})

routerLogin.post('/setLogin', passport.authenticate('login', {
    failureRedirect: '/login',
    successRedirect: '/'
}), (request, response) => {})

routerLogin.get('/cerrar-sesion', (request, response) => Login.logOut(request, response))

module.exports = routerLogin