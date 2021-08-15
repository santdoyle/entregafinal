const modelOrdenes = require('../models/modelOrdenes')
const modelUsers = require('../models/modelUsers')
const Notificaciones = require('../controllers/controllerNotificaciones')
const Loggers = require('../utils/logsConfig')

const notificaciones = new Notificaciones()
const orden = new modelOrdenes()

class Ordenes{
    async nuevaOrden(compra){
        try {
            const users = new modelUsers()
            const user = await users.getUserByID(compra.user)

            const nuevaCompra = {
                'items': compra.orden.producto,
                'numeroOrden': compra.numero,
                'fecha': Date.now(),
                'estado': 'Generada',
                'email': user[0].email,
                'cantidad': compra.cantidad
            }

            const nuevaOrden = await orden.newOrder(nuevaCompra)
            const notificar = notificaciones.newBuyNot(compra.orden)

            return nuevaOrden

        } catch (error) {
            Loggers.logError.error('Error al crear orden' + error)
        }
        
    }

    async ordenPorId(id){
        try {
            const ordenResumen = await orden.getOrder(id)
            
            return ordenResumen 
        } catch (error) {
            Loggers.logError.error('Error al crear orden - Controller - ' + error)
        }
        
    }
}

module.exports = Ordenes