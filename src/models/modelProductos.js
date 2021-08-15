const models = require('./schemas/schemaProductos.js')
const Loggers = require('../utils/logsConfig')

class modelProductosMongodb{

    async addOne(prod){
        try {
            const data = new models(prod)
            const save = await data.save((err, documment) => {
                if(err){
                    Loggers.logWarn.warn(`Error al guardar producto ${err}`)
                }else{
                    Loggers.logInfo.info('Producto guardado correctamente.')
                }
            })

            return save
        } catch (error) {
            Loggers.logError.error(`Error al añadir un producto ${error}`)
        }
        
    }


    async getAll(){
        try {
            const getAll = await models.find()

            if(getAll.length > 0){
                Loggers.logInfo.info(`Productos obtenidos correctamente`)
                return getAll
            }else{
                return {msj: 'No hay productos añadidos'}
            } 
        } catch (error) {
            Loggers.logError.error(`Error al buscar productos: ${error}`)
        }
        
    }


    async getOne(id){
        try {
            const getById = await models.find({"_id": id})

            return getById
        } catch (error) {
            Loggers.logError.error(`Error al buscar producto por ID: ${error}`)
        }
    }


    async updateOne(id, data){
        try {
            const update = await models.updateOne(
                {"_id": id},
                {$set: 
                    {
                        "nombre" : data.nombre,
                        "descripcion": data.descripcion,
                        "codigo": data.codigo,
                        "imgUrl": data.imgUrl,
                        "precio": data.precio,
                        "stock": data.stock 
                    }
                }
            )
            Loggers.logInfo.info(`Producto actualizado correctamente ${data.nombre}`)
            
            return update
        } catch (error) {
            Loggers.logError.error(`Error al actualizar producto: ${error}`)
        }
    }

    async deleteOne(id){
        console.log(id)
        try {
            const borrar = await models.deleteOne({"_id": id})

            if(borrar.ok === 1){
                Loggers.logInfo.info('Producto eliminado correctamente')

                return {msj: "Producto eliminado correctamente"}
            }else{
                return {msj: "Error al eliminar el producto"}
            }
            
        } catch (error) {
            Loggers.logError.error(`Error al eliminar producto: ${error}`)

        }
           
    }

    async searchBy(key){
        try {
            const buscar = await models.find({"nombre": key})

            if(buscar.length > 0){
                return buscar
            }else{
                return {msj: "No hay productos con ese nombre"}
            } 
        } catch (error) {
            Loggers.logError.error(`Error al buscar productos por key: ${error}`)
        }
    }

    async orderBy(key){
        try {
            const ordenar = await models.find({}).sort({key: -1})
        
            if(ordenar.length > 0){
                return ordenar
            }else{
                return {msj: "No hay productos con ese nombre"}
            }
        } catch (error) {
            Loggers.logError.error(`Error al ordenar productos: ${error}`)
        }
        
    }
}
    
module.exports = modelProductosMongodb