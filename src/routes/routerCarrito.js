const routerCarrito = require('express').Router();
const Carrito = require('../controllers/controllerCarrito.js');
const Ordenes = require('../controllers/controllerOrdenes')
const Loggers = require('../utils/logsConfig')

/*
    * Endpoint Carrito
*/
const carrito = new Carrito()
const orden = new Ordenes()

routerCarrito.get('/', (request, response) => {
    response.render('carrito', {
        msj: 'Cargando...'
    })
})

routerCarrito.get('/listar', async (request, response, next) => {
    try {
        const getProductos = await carrito.listarCarrito()

            if(getProductos.length > 0){
                response.json(getProductos)
            }else{
                response.json({msj: 'No hay productos en el carro'})
            }

        }catch (error) {
            Loggers.logError.error('Error al listar productos - Router - ' + Error)
            response.json({msj: `Ha ocurrido un error: ${error}`})
    }
})

//Cargar productos al carrito
let idCarrito = 0
routerCarrito.post('/agregar', async (request, response, next) => {
    try {
        const producto = request.body.id
        const user = request.session.passport.user

        const agregarAlCarro = await carrito.agregarAlCarrito(producto, user)

        response.json(agregarAlCarro)
        
    } catch (error) {
        Loggers.logError.error('Error al agregar un producto - Router - ' + Error)
        response.json({msj: `Ocurrio un error al añadir el producto`})
    }
    
})

//Eliminar producto del carrito
routerCarrito.delete('/borrar/:id', (request, response, next) => {
    try {
        if(request.params.id > carritoCompras.length){
            
            response.json({msj: "El producto no está en el carrito."})
        
        }else{
            
            const carritoActualizado = carrito.borrarDelCarrito(request.params.id)

            response.json(carritoActualizado)
        }
    
    } catch (error) {
        Loggers.logError.error('Error al borrar un producto')
        response.json({msj: `Ocurrio un error al eliminar el producto`})
    }
    
})

let numeroOrden = 0
routerCarrito.post('/comprar', async (request, response) => {
    const compra = {
        'orden': request.body.pedido,
        'numero': numeroOrden++,
        'cantidad': request.body.cantidad,
        'user': request.session.passport.user
    }
    
    const nuevaCompra = await orden.nuevaOrden(compra)
    const limpiar = carrito.limpiarCarro()
    
    response.json({id: nuevaCompra._id})
})

routerCarrito.get('/finalizar-compra/:id', async (request, response) => {
    const resumen = await orden.ordenPorId(request.params.id)
    
    response.render('comprar', {
        msj: 'Tu compra fue realizada con éxito.',
        data: resumen
    })
})

module.exports = routerCarrito