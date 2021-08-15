const schemaOrdenes = require('../models/schemas/schemaOrden')
const Loggers = require('../utils/logsConfig')

class Ordenes{
    async newOrder(compra){
        const nuevaOrden = new schemaOrdenes(compra)
        return nuevaOrden.save()
    }

    async getOrder(id){
        try {
            const orden = await schemaOrdenes.find({"_id": id})

            return orden
        } catch (error) {
            Loggers.logError.error('Error al buscar orden por id: ' + error)
        }
        
    }
}

module.exports = Ordenes