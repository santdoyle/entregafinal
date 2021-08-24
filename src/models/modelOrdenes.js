const schemaOrdenes = require('../models/schemas/schemaOrden')
const Loggers = require('../utils/logsConfig')

class Ordenes{
    static instancia
    
    constructor(connection) {
        if(!!Ordenes.instancia){
            return Ordenes.instancia
        }

        Ordenes.instancia = this
        this.connection = connection

    }

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