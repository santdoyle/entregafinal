const modelCarrito = require('../models/modelCarrito')
const Loggers = require('../utils/logsConfig')

const CarritoDb = new modelCarrito()

class CarritoController{
   
    async agregarAlCarrito(item, user){

        try {
            const agregar = await CarritoDb.addProduct(item, user)

            return agregar
        } catch (error) {
            Loggers.logError.error(`Error al añadir producto al carro: ${error}`)
        }
    }

    async listarCarrito(){
        try {
            const listar = CarritoDb.getProducts()

            return listar
        } catch (error) {
            Loggers.logError.error(`Error al buscar productos: ${error}`)

        }
        
    }

    async borrarDelCarrito(id){
        try {
            const borrar = await CarritoDb.deleteProduct(id)
        
            return borrar
        } catch (error) {
            Loggers.logError.error(`Error al borrar producto del carrito: ${error}`)

        }
        
    }

    async limpiarCarro(){
        try {
            const clean = await CarritoDb.cleanCart()
        } catch (error) {
            Loggers.logError.error(`Error al limpiar carrito: ${error}`)
        }
    }
}

module.exports = CarritoController