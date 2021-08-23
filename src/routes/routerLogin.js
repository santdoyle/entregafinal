const routerLogin = require('express').Router()
const passport = require('passport')
const flash = require('connect-flash')
const controllerLogin = require('../controllers/controllerLogin')
const jwt = require('jsonwebtoken')

const Login = new controllerLogin()

routerLogin.get('/login', (request, response) => {
    const error = request.flash('error')
    const success = request.flash('success')
    
    response.render('login', {
        error,
        success
    })
})

routerLogin.post('/setLogin', (request, response, next) =>{
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(err)
                const error = new Error('new Error')
                return next(error)
            }
    
            request.login(user, { session: false }, async (err) => {
                
                if (err) return next(err)
                const body = { _id: user._id, email: user.email }
        
                const token = jwt.sign({ user: body }, 'top_secret')
                
                response.redirect(`/?secret_token=${token}`)
                //response.header({'Authorization':`bearer ${token}`})
               //response.json('test')

            })
        }catch(e) {
            return next(e)
        }
      })(request, response, next)
})

routerLogin.get('/cerrar-sesion', (request, response) => Login.logOut(request, response))

module.exports = routerLogin