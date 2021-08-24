const schemaCarrito = require('../models/schemas/schemaCarrito')
const modelProductos = require('../models/modelProductos')
const Loggers = require('../utils/logsConfig')

let id = 0
class Carrito{
    static instancia
    
    constructor(connection) {
        if(!!Carrito.instancia){
            return Carrito.instancia
        }

        Carrito.instancia = this
        this.connection = connection

    }

    async addProduct(producto, user){
        try {
            const getProducto = new modelProductos()
            const item = await getProducto.getOne(producto)

            const data = {
                'id': id++,
                'fecha': Date.now(),
                'user': user,
                'producto': JSON.stringify(item[0]),
            }
            
            const add = new schemaCarrito(data)
            const save = await add.save((err, documment) => {
                if(err){
                    Loggers.logWarn.warn(`Error al guardar en carrito ${err}`)
                }else{
                    Loggers.logInfo.info('Carrito guardado correctamente')
                }
            })

            return save
        } catch (error) {
            Loggers.logError.error(`Error al guardar en carrito ${error}`)
        }

    }

    async getProducts(){
        try {
            const getAll = await schemaCarrito.find()

            return getAll

        } catch (error) {
            Loggers.logError.error(`Error al buscar carritos: ${error}`)
        }
        
    }

    async getProductById(id){
        try {
            const getProduct = await schemaCarrito.find({id: id})
        
            return getProduct
        } catch (error) {
            Loggers.logError.error(`Error al buscar carrito por id: ${error}`)

        }
        
    }

    updateProduct(id){

    }

    async deleteProduct(id){
        try {
            const deleteItem = await schemaCarrito.deleteOne({'_id': id})

            return deleteItem
        } catch (error) {
            Loggers.logError.error(`Error al eliminar carrito: ${error}`)

        }
        
    }

    async cleanCart(){
        try {
            const cleanCart = await schemaCarrito.deleteMany()

            return cleanCart
        } catch (error) {
            Loggers.logError.error(`Error al limpiar el carrito ${error}`)

        }
    }

}

module.exports = Carrito