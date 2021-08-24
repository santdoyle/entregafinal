const schemaChat = require('./schemas/schemaChat')
const Loggers = require('../utils/logsConfig')

class modelChat{
    async saveMessages(mensaje){
        try {
            const guardarMensajes = new schemaChat(mensaje)
            return await guardarMensajes.save()
        } catch (error) {
            Loggers.logError.error('Error al guardar mensaje - Model - ' + error)
        }
        
    }

    async getMensajes(de, para){
        console.log('de', de)
        console.log('para', para)
        try {
             const mensajesEmisor = await schemaChat.find({"de": de, "para": para})
             //const mensajesReceptor = await schemaChat.find({"de": para, "para": de})

            /*const mensajes = await schemaChat.find({
                    $and: [
                        {$or: [{"de": de, "para": para}] },
                        {$or: [{"de": para, "para": de}] }
                    ]
                })*/
    
            return mensajesEmisor

        } catch (error) {
            Loggers.logError.error('Error al recuperar mensajes - model - ' + error)
        }
    }
}

module.exports = modelChat