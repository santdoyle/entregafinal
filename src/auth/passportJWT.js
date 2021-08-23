const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const Users = require('../models/schemas/schemaUsers')
const bcrypt = require('bcrypt')
const Loggers = require('../utils/logsConfig')
const flash = require('connect-flash')
const {config} = require('../../config')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTTOKEN;

passport.use('JWTlogin', new JwtStrategy(opts, (jwt_payload, done) => {
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
}));