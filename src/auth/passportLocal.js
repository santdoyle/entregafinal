const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/schemas/schemaUsers')
const bcrypt = require('bcrypt')
const controllerNotificaciones = require('../controllers/controllerNotificaciones')
const schema = require('../utils/joiConfig')
const Loggers = require('../utils/logsConfig')
const flash = require('connect-flash')

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

            return done(null, false, req.flash('errorRegistro', 'El correo ya está registrado'))
        
        }else{

            const newUser = new Users()
            
            newUser.nombre = req.body.nombre
            newUser.apellido = req.body.apellido
            newUser.email = email
            newUser.telefono = req.body.telefono
            newUser.caracteristica = req.body.caracteristica
            newUser.password = newUser.createHash(password)
            
            const validation = newUser.validateSync()
            
            if(!validation){
                await newUser.save()
                
                Notificaciones.newUserNot(newUser)
                Loggers.logInfo.info(`Nuevo usuario registrado: ${newUser.email}`)

                return done(null, newUser, {message: {success: 'Registro correcto. Ingresa tus datos para iniciar sesión.'}})
            }else{
                return done(null, false, req.flash('errorRegistro', `${validation.errors.nombre}`))
            }
            
        }
    } catch (error) {
        Loggers.logError.error(`Error en nuevo registro: ${error}`)

        return done(null, false, req.flash('errorRegistro', `Error durante el registro.`))

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
                return done(null, false, {message: {error: 'La contraseña no es correcta'}})

            }else{
                Loggers.logInfo.info(`Login correcto: ${email}`)
                return done(null, checkUser[0], {message: {success: 'Login correcto'}})

            }
        }else{
            return done(null, checkUser[0], {message: {error: 'El usuario no existe'}})
        }
    } catch (error) {
        console.log(error)
        Loggers.logError.error(`Error en login ${error}`)
        return don(null, false, {message: {error: `${error}`}})
    }

}))