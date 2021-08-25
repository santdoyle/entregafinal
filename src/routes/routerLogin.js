const routerLogin = require('express').Router()
const passport = require('passport')
const flash = require('connect-flash')
const controllerLogin = require('../controllers/controllerLogin')

const Login = new controllerLogin()

routerLogin.get('/login', (request, response) => {
  
    response.render('login')
})


routerLogin.post('/setLogin', (request, response, next) => {
    passport.authenticate('login', (err, user, info) => {

        if (err) return next(err);
        
        if (user) {
        request.logIn(user, function(err) {
            if (err) return next(err);
            response.header('test', 'otro')
            response.json(info);
        });
        } else {
            response.json(info);
        }
    })(request, response, next);
})



routerLogin.get('/cerrar-sesion', (request, response) => Login.logOut(request, response))

module.exports = routerLogin