const express = require('express');
const Carrito = require('../controllers/controllerCarrito.js');
const Ordenes = require('../controllers/controllerOrdenes')
const routerCarrito = express.Router()

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

routerCarrito.get('/listar', (request, response, next) => {
    try {
        const getProductos = carrito.listarCarrito()

        getProductos.then(resp => {
            if(resp.length > 0){
                response.json(resp)
            }else{
                response.json({msj: 'No hay productos en el carro'})
            }
        })

    } catch (error) {
        response.json({msj: `Ha ocurrido un error: ${error}`})
    }
})

//Cargar productos al carrito
let idCarrito = 0
routerCarrito.post('/agregar', (request, response, next) => {
    try {
        const producto = request.body.id
        const user = request.session.passport.user

        const agregarAlCarro = carrito.agregarAlCarrito(producto, user)

        agregarAlCarro.then(resp =>{
            response.json(resp)
        })
        
    } catch (error) {
        response.json({msj: `Ha ocurrido un error: ${error}`})
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
        response.json({msj: `Ha ocurrido un error: ${error}`})
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