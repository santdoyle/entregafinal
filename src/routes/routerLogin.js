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
        console.log('err', err)
        console.log('info', info)
        if (err) return next(err);
        
        if (user) {
            
            request.logIn(user, function(err) {
                if (err) return next(err);
                
                const payload = {
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                }

                const token = jwt.sign(payload, 'secretKey', {
                    expiresIn: 1000 * 60
                })
                response.cookie('token', token, {
                    maxAge: 1000 * 60,
                    secure: false,
                    httpOnly: true,
                  });

                response.json(info);
            });
        } else {
            response.status(401).json({info: info});
        }
    })(request, response, next);
})


routerLogin.get('/cerrar-sesion', (request, response) => Login.logOut(request, response))

module.exports = routerLogin