const Loggers = require('../utils/logsConfig')

class controllerLogin{
    logOut(request, response){
        response.clearCookie('token')
        request.session.destroy()
        response.redirect('/login')

        Loggers.logInfo.info('Sesion finalizada')
    }
}

module.exports = controllerLogin