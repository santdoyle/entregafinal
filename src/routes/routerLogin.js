const routerLogin = require('express').Router()
const passport = require('passport')
const flash = require('connect-flash')
const controllerLogin = require('../controllers/controllerLogin')
const jwt = require('jsonwebtoken')

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
                
                const token = jwt.sign(user.toJSON(), 'secretKey')
                response.header('authorization', `Bearer ${token}`)
                response.json({info, token});
            });
        } else {
            response.status(401).json({info: info});
        }
    })(request, response, next);
})



routerLogin.get('/cerrar-sesion', (request, response) => Login.logOut(request, response))

module.exports = routerLogin