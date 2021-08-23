const routerChat = require('express').Router();
const authorized = require('../auth/isAuthorized')
const controllerUsers = require('../controllers/controllerUsers')
const controllerChat = require('../controllers/controllerChat')
const {config} = require('../../config')
const Loggers = require('../utils/logsConfig')


routerChat.get('/', authorized, async (request, response)=> {
    try {
        const user = new controllerUsers()
        const userData = await user.usuarioPorID(request.session.passport.user)

        response.redirect(`/chat/${userData[0].email}`)
    } catch (error) {
        Loggers.logError.error('Error al abrir chat - router' + error)
        response.json({error: 'Ocurrio un error al cargar el chat. Vuelve a intentarlo'})
    }
    

})

//ruta /chat/:email el usuario ve sus mensjaes
routerChat.get('/:email', authorized, async (request, response) => {
    const {email} = request.params

    response.render('chat')
})

//rutas /chat/admin el administrador puede responder mensajes
routerChat.get('/admin', authorized, (request, response) => {

    response.render('chat')
})

module.exports = routerChat