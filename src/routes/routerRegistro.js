const routerRegistro = require('express').Router()
const passport = require('passport')

routerRegistro.get('/crear-cuenta', (request, response) => {
    const error = request.flash('errorRegistro')
    const success = request.flash('success')
    response.render('registro', {
        error,
        success
    })
})

routerRegistro.post('/setRegistro', passport.authenticate('registro', {
    failureMessage: 'Ocurrio un error al crear tu cuenta',
    failureRedirect: '/crear-cuenta',
    successRedirect: '/login'
}), (request, response) => {


})

module.exports = routerRegistro