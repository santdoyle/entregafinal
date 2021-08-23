const modelChat = require('../models/modelChat')
const Loggers = require('../utils/logsConfig')

const Chat = new modelChat()

class chatController{
    
    guardarMensajes(data){
        try {
            if(!data) return 'Error'
            else{
                const guardar = Chat.saveMessages(data)
                return guardar
            } 
        } catch (error) {
            Loggers.logError.error('Error al guardar mensaje - Controller - ' + error)
        }
    }

    async listarMensajes(de, para){
        try {
            if(!de) return 'Usuario no encontrado'
            else{
                const mensajes = await Chat.getMensajes(de, para)
                return mensajes
            }
        } catch (error) {
            Loggers.logError.error('Error al recuperar mensaje - Controller - ' + error)
        }
    }

}

module.exports = chatController