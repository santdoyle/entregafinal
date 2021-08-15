const modelProductos = require('../models/modelProductos')
//const productosDTO = require('../models/mongoDB/DTO/productosDTO')
const Loggers = require('../utils/logsConfig')

const db = new modelProductos()
//const DTO = new productosDTO()

class Productos{

     listarTodos(){
        try {
            const listaDeProductos = db.getAll()

            return Promise.resolve(listaDeProductos)
        } catch (error) {
            Loggers.logError.error(`Error al buscar productos ${error}`)
        }
        
    }
    
    async listarProductosPorID(id){
        try {
            
            const listaDeProductos = await db.getOne(id)

            return listaDeProductos
        } catch (error) {
            Loggers.logError.error(`Error al buscar producto por id ${error}`)
        }
        
    }

    agregarProducto(data, id){
        
        let producto = {
            id: id++,
            timestamp: Date.now(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            imgUrl: data.imgUrl,
            precio: data.precio,
            stock: data.stock
        }
        
        const listaDeProductos = db.addOne(producto)

        return Promise.resolve(listaDeProductos)

    }

    
    actualizarProducto(id, data){
            
        const listaDeProductos = db.updateOne(id, data)
        
        return Promise.resolve(listaDeProductos)
        
        
    }

    borrarProducto(id){
        const listaDeProductos = db.deleteOne(id)
            
        return Promise.resolve(listaDeProductos)
    }

    async buscarPor(key){
        const listaDeProductos = await db.searchBy(key)
            
        return listaDeProductos
    }

    ordenarPor(key){
        const listaDeProductos = db.orderBy(key)

        return Promise.resolve(listaDeProductos)
    }

}

module.exports = Productos