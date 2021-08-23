const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/schemas/schemaUsers')
const bcrypt = require('bcrypt')
const controllerNotificaciones = require('../controllers/controllerNotificaciones')
const schema = require('../utils/joiConfig')
const Loggers = require('../utils/logsConfig')
const flash = require('connect-flash')
const jwt = require('jsonwebtoken')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const {config} = require('../../config')

const Notificaciones = new controllerNotificaciones()

//Encriptación y desencriptación de usuario
passport.serializeUser((checkUser, done) => {

    done(null, checkUser.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await Users.findOne({'_id': id})
    done(null, user)
})


passport.use('registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwordRegistro',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await Users.find({'email': email})
        
        if(user.length > 0){
            Loggers.logInfo.info(`El correo registrado ya existe: ${email}`)

            return done(null, false, req.flash('error', 'El correo ya está registrado'))
        
        }else{

            const validar = await schema.validateAsync({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                password: password,
                email: email,
                telefono: req.body.telefono,
                caracteristica: req.body.caracteristica
            })

            if(validar){
                const newUser = new Users()
            
                newUser.nombre = req.body.nombre
                newUser.apellido = req.body.apellido
                newUser.email = email
                newUser.telefono = req.body.telefono
                newUser.caracteristica = req.body.caracteristica
                newUser.password = newUser.createHash(password)
                        
                await newUser.save()
                

                Notificaciones.sendEmail(newUser)
                Loggers.logInfo.info(`Nuevo usuario registrado: ${newUser.email}`)

                return done(null, newUser, req.flash('success', 'Usuario registrado correctamente'))
            }            
        }
    } catch (error) {
        Loggers.logError.error(`Error en nuevo registro: ${error.details[0].message}`)

        return error.details[0].message

    }
    
}))


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {
    
    try {
        const checkUser = await Users.find({'email': email})
        
        if(checkUser.length > 0){
            const checkPass = bcrypt.compareSync(password, checkUser[0].password)
            Loggers.logWarn.warn(`Nuevo intento de login: ${email}`)
            
            if(checkPass === false){
                Loggers.logWarn.warn(`Intento de login, contraseña incorrecta ${email}`)
                return done(null, false, req.flash('error', 'La contraseña no es correcta'))

            }else{
                Loggers.logInfo.info(`Login correcto: ${email}`)

                return done(null, checkUser[0], req.flash('success', 'Login correcto'))

            }
        }else{
            return done(null, checkUser[0], req.flash('error', 'El usuario no existe'))
        }
    } catch (error) {
        Loggers.logError.error(`Error en login ${error}`)
    }

}))

passport.use('jwt', new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))